import { Schema, model } from 'mongoose'
import mexp from 'mongoose-elasticsearch-xp';

const EmptyCollectionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    topic: {type: String, required: true},
    category: {type: String},
    createdAt: {type: Date, default: Date.now},
    image_url: {type: String},
    category_id: {type: String},
    items: [],
    extraFields: [],
    user: {
        username: {type: String, required: true},
        isAdmin: {type: Boolean, required: true},
        _id: {type: Schema.Types.ObjectId, required: true}
    },
})

const ExtraFieldSchema = new Schema({
    fieldType: {type: String},
    label: {type: String},
    value: {type: Schema.Types.Mixed}
})

const ItemSchema = new Schema({
    name: {type: String, required: true},
    tags: [{type: String, required: true}],
    lastUpdate: {type: Date, default: Date.now},
    parentCollection: {type: EmptyCollectionSchema},
    extraFields: [ExtraFieldSchema]
})

ItemSchema.plugin(mexp, {
    host: 'localhost',
    port: 9200,
    index: 'default'
  });

const ItemModel = model('Item', ItemSchema);

export default ItemModel
