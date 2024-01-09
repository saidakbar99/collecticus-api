import CollectionModel from "../models/collection-model.js"

class CollectionController {
    async create(req, res, next) {
        try {
            const doc = new CollectionModel({
                title: req.body.collection.title,
                description: req.body.collection.description,
                topic: req.body.collection.topic,
                user: req.body.collection.user
            })

            const collection = await doc.save()

            res.json(collection)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }
}

export default new CollectionController()