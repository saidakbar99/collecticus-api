import CollectionModel from "../models/collection-model.js"
import ItemModel from "../models/item-model.js"
// import TagModel from "../models/tag-model.js"

class ItemController {
    async addItemToCollection(req, res, next) {
        try {
            const { item, collectionId } = req.body
            const collection = await CollectionModel.findById(collectionId)

            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' })
            }

            const globalItem = await ItemModel.create(item)
            collection.items.push(globalItem)
            const updatedCollection = await collection.save()

            res.json(updatedCollection)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async editItem(req, res, next) {
        //! edit is not updating ItemModel item after second change !//
        try {
            const { updatedItem, collectionId, itemId } = req.body;
            // console.log('>>>', updatedItem)
            const collection = await CollectionModel.findById(collectionId);
            // const item = await ItemModel.findById(itemId);
            const itemIndex = collection.items.findIndex(item => item._id == itemId);

            if (!collection || itemIndex === -1) {
                return res.status(404).json({ error: 'Collection or Item not found' });
            }

            collection.items[itemIndex].set(updatedItem)
            const updatedItemModel = await ItemModel.findByIdAndUpdate(itemId, updatedItem, {
                new: true, // Return the modified document
            });
            // Object.assign(item, updatedItem)
            // item._id = itemId

            // const updatedItemModel = await item.save()
            // console.log('>>>2', updatedItemModel)
            const updatedCollection = await collection.save();

            // const updatedItemModel = await ItemModel.findOneAndUpdate(
            //     { _id: itemId },
            //     { $set: updatedItem },
            //     // { new: true }
            // )

            res.json({ updatedCollection, updatedItemModel });
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async deleteItems(req, res, next) {
        try {
            const { selectedItems, collectionId } = req.body
            const collection = await CollectionModel.findById(collectionId)
            collection.items = collection.items.filter(item => !selectedItems.includes(item._id.toString()))
            const updatedCollection = await collection.save();

            const deletedItems = await ItemModel.deleteMany({ _id: { $in: selectedItems } })

            res.json({updatedCollection, deletedItems})
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async getLastItems(req, res, next) {
        try {
            const items = await ItemModel.find()
                .sort({ lastUpdate: -1 })
                .limit(10)

            res.json(items)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async getItem(req, res, next) {
        try {
            const itemId = req.params.id
            const item = await ItemModel.findById(itemId)

            res.json(item)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }
}

export default new ItemController()