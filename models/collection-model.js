import { Schema, model } from 'mongoose'

const CollectionSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    theme: {type: String, required: true},
    image_url: {type: String},
    user_id: {type: String, required: true},
    category_id: {type: String, required: true},
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
})

export default model('Collection', CollectionSchema)