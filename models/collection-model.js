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
        // custom_string_1: {
        //     state: {type: Boolean, default: false},
        //     label: {type: String},
        // },
        // custom_string1_state: {type: Boolean, default: false},
        // custom_string1_name: {type: String},
        // custom_string2_state: {type: Boolean, default: false},
        // custom_string2_name: {type: String},
        // custom_string3_state: {type: Boolean, default: false},
        // custom_string3_name: {type: String},
        // custom_int1_state: {type: Boolean, default: false},
        // custom_int1_name: {type: Number},
        // custom_int2_state: {type: Boolean, default: false},
        // custom_int2_name: {type: Number},
        // custom_int3_state: {type: Boolean, default: false},
        // custom_int3_name: {type: Number},
        // custom_boolean1_state: {type: Boolean, default: false},
        // custom_boolean1_name: {type: Boolean},
        // custom_boolean2_state: {type: Boolean, default: false},
        // custom_boolean2_name: {type: Boolean},
        // custom_boolean3_state: {type: Boolean, default: false},
        // custom_boolean3_name: {type: Boolean},
        // custom_date1_state: {type: Boolean, default: false},
        // custom_date1_name: {type: Date},
        // custom_date2_state: {type: Boolean, default: false},
        // custom_date2_name: {type: Date},
        // custom_date3_state: {type: Boolean, default: false},
        // custom_date3_name: {type: Date},
        // custom_text1_state: {type: Boolean, default: false},
        // custom_text1_name: {type: String},
        // custom_text2_state: {type: Boolean, default: false},
        // custom_text2_name: {type: String},
        // custom_text3_state: {type: Boolean, default: false},
        // custom_text3_name: {type: String},
    // ],
    user: {
        username: {type: String, required: true},
        isAdmin: {type: Boolean, required: true},
        _id: {type: Schema.Types.ObjectId, required: true}
    },
})

export default model('Collection', CollectionSchema)