import { Schema, model } from 'mongoose'

const CollectionTopicSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
})

export default model('CollectionTopic', CollectionTopicSchema)