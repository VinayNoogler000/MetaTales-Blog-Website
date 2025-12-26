// This "post.js" is a service responsible for Creating, Updating, Deleting, Geting (single and list) of Posts:

import envConfig from "../envConfig";
import { Client, ID, Query, TablesDB } from "appwrite";

export class PostService{
    client = new Client();
    tablesDB;

    constructor() {
        this.client
            .setEndpoint(envConfig.appwriteUrl)
            .setProject(envConfig.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
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
}

const postService = new PostService();

export default postService;