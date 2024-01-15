import { Schema, model } from 'mongoose'

const ItemSchema = new Schema({
    name: {type: String, unique: true, required: true},
    tags: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const CollectionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    topic: {type: String, required: true},
    category: {type: String},
    user: {
        username: {type: String, required: true},
        isAdmin: {type: Boolean, required: true},
        id: {type: Schema.Types.ObjectId, required: true}
    },
    createdAt: {type: Date, default: Date.now},
    image_url: {type: String},
    category_id: {type: String},
    items: [ItemSchema],
    custom_string1_state: {type: Boolean, default: false},
    custom_string1_name: {type: String},
    custom_string2_state: {type: Boolean, default: false},
    custom_string2_name: {type: String},
    custom_string3_state: {type: Boolean, default: false},
    custom_string3_name: {type: String},
    custom_int1_state: {type: Boolean, default: false},
    custom_int1_name: {type: Number},
    custom_int2_state: {type: Boolean, default: false},
    custom_int2_name: {type: Number},
    custom_int3_state: {type: Boolean, default: false},
    custom_int3_name: {type: Number},
    custom_boolean1_state: {type: Boolean, default: false},
    custom_boolean1_name: {type: Boolean},
    custom_boolean2_state: {type: Boolean, default: false},
    custom_boolean2_name: {type: Boolean},
    custom_boolean3_state: {type: Boolean, default: false},
    custom_boolean3_name: {type: Boolean},
    custom_date1_state: {type: Boolean, default: false},
    custom_date1_name: {type: Date},
    custom_date2_state: {type: Boolean, default: false},
    custom_date2_name: {type: Date},
    custom_date3_state: {type: Boolean, default: false},
    custom_date3_name: {type: Date},
    custom_text1_state: {type: Boolean, default: false},
    custom_text1_name: {type: String},
    custom_text2_state: {type: Boolean, default: false},
    custom_text2_name: {type: String},
    custom_text3_state: {type: Boolean, default: false},
    custom_text3_name: {type: String},
})

export default model('Collection', CollectionSchema)