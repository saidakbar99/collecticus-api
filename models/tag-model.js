import { Schema, model } from 'mongoose'

const TagSchema = new Schema({
    tag: {type: String, required: true},
    itemsCount: {type: Number, default: 0}
})

export default model('Tag', TagSchema)
