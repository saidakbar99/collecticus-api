import UserService from '../service/user-service.js'
class UserController {
    async registration(req, res, next) {
        try {
            const { username, password, email } = req.body
            const userData = await UserService.registration(username, password, email)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const userData = await UserService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async blockUser (req, res, next) {
        try {
            const { selectedIds } = req.body
            const result = await UserService.block(selectedIds)
            return res.json({ message: 'Users status updated', result })
        } catch (e) {
            next(e)
        }
    }

    async unblockUser (req, res, next) {
        try {
            const { selectedIds } = req.body
            const result = await UserService.unblock(selectedIds)
            return res.json({ message: 'Users status updated', result })
        } catch (e) {
            next(e)
        }
    }

    async deleteUser (req, res, next) {
        try {
            const { selectedIds } = req.body
            const result = await UserService.delete(selectedIds)
            return res.json({ message: 'Users deleted successfully', result })
        } catch (e) {
            next(e)
        }
    }

    async makeAdmin (req, res, next) {
        try {
            const { selectedIds } = req.body
            const result = await UserService.admin(selectedIds)
            return res.json({ message: 'Users are admin now!', result })
        } catch (e) {
            next(e)
        }
    }

    async unmakeAdmin (req, res, next) {
        try {
            const { selectedIds } = req.body
            const result = await UserService.unAdmin(selectedIds)
            return res.json({ message: 'Users are removed from admin!', result })
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()
