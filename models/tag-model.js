import { Schema, model } from 'mongoose'

const TagSchema = new Schema({
    tag: {type: String, unique: true},
})

export default model('Tag', TagSchema)
