import bcrypt from 'bcrypt'

import UserModel from '../models/user-model.js'
import UserDto from '../dtos/user-dto.js'
import tokenService from './token-service.js'
import ApiError from '../exceptions/api-error.js'

class UserService {
    async generateAndSaveToken(user) {
        const userDto = new UserDto(user)
        const tokens = tokenService.generateAccessToken({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto}
    }

    async registration(username, password, email) {
        const candidate = await UserModel.findOne({ username })

        if (candidate) {
            throw ApiError.BadRequest(`User with ${username} username already exist`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({ username, password: hashPassword, email })

        return this.generateAndSaveToken(user)
    }

    async login(username, password) {
        const user = await UserModel.findOne({ username })
        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!user || !isPassEquals) {
            throw ApiError.UnauthorizedError('Wrong username/password')
        }

        if (user.isBlocked) {
            throw ApiError.BadRequest('This user is blocked')
        }

        await UserModel.findOneAndUpdate({username: username}, {lastLogin: Date.now()})

        return this.generateAndSaveToken(user)
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async getAllUsers() {
        return await UserModel.find()
    }

    async delete(selectedIds) {
        return await UserModel.deleteMany({ _id: { $in: selectedIds } })
    }

    async block(selectedIds) {
        return await UserModel.updateMany({ _id: { $in: selectedIds } }, {'$set':{'isBlocked': true, 'isAdmin': false}})
    }

    async unblock(selectedIds) {
        return await UserModel.updateMany({ _id: { $in: selectedIds } }, {'$set':{'isBlocked': false}})
    }

    async admin(selectedIds) {
        return await UserModel.updateMany({ _id: { $in: selectedIds } }, {'$set':{'isAdmin': true, 'isBlocked': false}})
    }

    async unAdmin(selectedIds) {
        return await UserModel.updateMany({ _id: { $in: selectedIds } }, {'$set':{'isAdmin': false}})
    }
}

export default new UserService()
