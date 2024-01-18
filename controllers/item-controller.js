import CollectionModel from "../models/collection-model.js"
import ItemModel from "../models/item-model.js"

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
            const collection = await CollectionModel.findById(collectionId);
            // let item = await ItemModel.findById(itemId);
            // console.log('>>>item', item)
            const itemIndex = collection.items.findIndex(item => item._id == itemId);

            if (!collection || itemIndex === -1) {
                return res.status(404).json({ error: 'Collection or Item not found' });
            }

            collection.items[itemIndex] = updatedItem;
            // item = updatedItem
            // const updatedItemModel = await item.save()
            const updatedCollection = await collection.save();

            const updatedItemModel = await ItemModel.findOneAndUpdate(
                { _id: itemId },
                { $set: updatedItem },
                { new: true }
            )

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
}

export default new ItemController()