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

    async getUserCollections(userId) {
        try {
            return await CollectionModel.find({ 'user._id': userId })
        } catch (e) {
            console.error(`Error in getUserCollections`);
            throw error;
        }
    }

    async deleteSelectedCollections(selectedCollections) {
        try {
            return await CollectionModel.deleteMany({ _id: { $in: selectedCollections } })
        } catch (error) {
            console.error(`Error in deleteSelectedCollections`);
            throw error;
        }
    }

    async getBiggestCollections() {
        try {
            return await CollectionModel.aggregate([
                {
                    $project: {
                        title: 1,
                        description: 1,
                        createdAt: 1,
                        user: 1,
                        topic: 1,
                        image_url: 1,
                        itemCount: { $size: '$items' }
                    }
                },
                { $sort: { itemCount: -1 } },
                { $limit: 5 }
            ])
        } catch (error) {
            console.error('Error fetching top collections:', error);
            throw error;
        }
    }
}

export default new UserService()
