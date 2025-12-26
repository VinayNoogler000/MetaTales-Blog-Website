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
            console.error("Appwrite/Cofig.js :: createPost() :: error", err);
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
            console.error("Appwrite/Cofig.js :: updatePost() :: error", err);
        }
    }
}

const service = new Service();

export default service;