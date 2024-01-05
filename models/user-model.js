import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    createdAt: {type: Date, default: Date.now()},
    lastLogin: {type: Date, default: Date.now()},
    isBlocked: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    avatarUrl: {type: String}
})

export default model('User', UserSchema)
