import CollectionModel from "../models/collection-model.js"
import CollectionService from "../service/collection-service.js"

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

    async getAll(req, res, next) {
        try {
            const collections = await CollectionService.getAllCollections()

            res.json(collections)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async getLast(req, res, next) {
        try {
            const collections = await CollectionService.getLastCollections()

            res.json(collections)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const collectionId = req.params.id
            const collection = await CollectionService.getOneCollection(collectionId)

            res.json(collection)
        } catch (e) {
            console.error('>>>Error: ', e)
            next(e)
        }
    }

    async getUserAll(req, res, next) {
        try {
            const userId = req.params.id
            const collections = await CollectionService.getUserCollections(userId)

            res.json(collections)
        } catch (e) {
            console.error('>>>Error1: ', e)
            next(e)
        }
    }
}

export default new CollectionController()