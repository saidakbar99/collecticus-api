import { Schema, model } from 'mongoose'

import ItemModel from './item-model.js'

const ExtraFieldSchema = new Schema({
    fieldType: {type: String},
    label: {type: String},
})

const CollectionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    topic: {type: String, required: true},
    category: {type: String},
    createdAt: {type: Date, default: Date.now},
    image_url: {type: String},
    category_id: {type: String},
    items: [ItemModel.schema],
    extraFields: [ExtraFieldSchema],
    user: {
        username: {type: String, required: true},
        isAdmin: {type: Boolean, required: true},
        _id: {type: Schema.Types.ObjectId, required: true}
    },
})

export default model('Collection', CollectionSchema)