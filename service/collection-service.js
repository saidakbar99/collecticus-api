import CollectionModel from "../models/collection-model.js"

class UserService {
    async getAllCollections() {
        return await CollectionModel.find()
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
