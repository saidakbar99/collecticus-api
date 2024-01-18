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

            console.log('>>>item', item)

            const globalItem = await ItemModel.create(item)
            console.log('>>>globalItem', globalItem)

            collection.items.push(globalItem)
            const updatedCollection = await collection.save()

            res.json(updatedCollection)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async editItem(req, res, next) {
        try {
            const { updatedItem, collectionId, itemId } = req.body
            const collection = await CollectionModel.findById(collectionId)
            const itemIndex = collection.items.findIndex(item => item._id == itemId)

            if (!collection || itemIndex === -1) {
                return res.status(404).json({ error: 'Collection or Item not found' })
            }

            collection.items[itemIndex] = updatedItem
            const updatedCollection = await collection.save()

            res.json(updatedCollection)
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