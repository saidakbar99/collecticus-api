import CollectionModel from "../models/collection-model.js"

class UserService {
    async getAllCollections() {
        return await CollectionModel.find()
    }

    async getLastCollections() {
        return await CollectionModel.find().sort({ _id: -1 }).limit(10)
    }

    async getOneCollection(collectionId) {
        try {
            return await CollectionModel.findById(collectionId)
        } catch (e) {
            console.error(`Error in getOneCollection`);
            throw error;
        }
    }
}

export default new UserService()
