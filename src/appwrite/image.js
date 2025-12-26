// This "image.js" is a service responsible for Creating, Updating, Deleting and Previewing image files of the Posts:

import envConfig from "../envConfig";
import { Client, ID, Storage } from "appwrite";

export class ImageService{
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(envConfig.appwriteUrl)
            .setProject(envConfig.appwriteProjectId);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: envConfig.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            });
        }
        catch(err) {
            console.error("Appwrite/Config.js :: uploadFile() :: error", err);
        }
        return false;
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile({
                bucketId: envConfig.appwriteBucketId,
                fileId: fileId
            });
        }
        catch(err){
            console.error("Appwrite/Cofig.js :: deleteFile() :: error", err);
        }
        return false;
    }

    async updateFile(fileId, name) {
        try {
            return await this.bucket.updateFile({
                bucketId: envConfig.appwriteBucketId,
                fileId: fileId,
                name: name
            });
        }
        catch(err) {
            console.error("Appwrite/Cofig.js :: updateFile() :: error", err);
        }
        return false;
    }

    getImagePreview(fileId) {
        return this.bucket.getFilePreview({
            bucketId: envConfig.appwriteBucketId,
            fileId: fileId
        });
    }
}

const imageService = new ImageService();

export default imageService;