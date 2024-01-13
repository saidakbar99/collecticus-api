import CollectionModel from "../models/collection-model.js"

class ItemController {
    async addItemToCollection(req, res, next) {
        try {
            const { name, tags, collectionId } = req.body.item
            const collection = await CollectionModel.findById(collectionId)

            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' })
            }

            const newItem = {
                name,
                tags
            }
            collection.items.push(newItem)

            const updatedCollection = await collection.save()

            res.json(updatedCollection)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }
}

export default new ItemController()