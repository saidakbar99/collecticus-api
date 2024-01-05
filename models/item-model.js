import { Schema, model } from 'mongoose'

const ItemSchema = new Schema({
    name: {type: String, unique: true, required: true},
    tag: {type: String, required: true},
    collection: {type: Schema.Types.ObjectId, required: true, ref: 'Collection'}
})

export default model('Item', ItemSchema)
