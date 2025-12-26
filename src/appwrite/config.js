import envConfig from "../envConfig";
import { Client, ID, Storage, Query, TablesDB } from "appwrite";

export class Service{
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(envConfig.appwriteUrl)
            .setProject(envConfig.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.tablesDB.createRow({
                databaseId: envConfig.appwriteDBId,
                tableId: envConfig.appwriteCollectionId,
                rowId: slug,
                data: {title, content, featuredImage, status, userId}
            });
        }
        catch(err) {
            console.error("Appwrite/Config.js :: createPost() :: error", err);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: envConfig.appwriteDBId,
                tableId: appwriteCollectionId,
                rowId: slug,
                data: {title, content, featuredImage, status}
            });
        }
        catch(err) {
            console.error("Appwrite/Config.js :: updatePost() :: error", err);
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: envConfig.appwriteDBId,
                tableId: envConfig.appwriteCollectionId,
                rowId: slug
            });
            return true;
        }
        catch(err) {
            console.error("Appwrite/Config.js :: deletePost() :: error", err);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: envConfig.appwriteDBId,
                tableId: envConfig.appwriteCollectionId,
                rowId: slug
            })
        }
        catch(err) {
            console.error("Appwrite/Config.js :: getPost() :: error", err);
        }
        return false;
    }

    async listPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tablesDB.listRows({
                databaseId: envConfig.databaseId,
                tableId: envConfig.appwriteCollectionId,
                queries: queries
            });
        }
        catch(err) {
            console.error("Appwrite/Cofig.js :: listPosts() :: error", err);
        }
        return false;
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
}

const service = new Service();

export default service;