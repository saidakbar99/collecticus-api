import CollectionModel from "../models/collection-model.js"

class ItemController {
    async addItemToCollection(req, res, next) {
        try {
            const { item, collectionId } = req.body
            const collection = await CollectionModel.findById(collectionId)

            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' })
            }

            collection.items.push(item)
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
}

export default new ItemController()