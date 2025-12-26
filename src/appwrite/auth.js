import config from "../config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAcc = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });

            if (userAcc) {
                return this.login(email, password);
            }
            else return userAcc;
        }
        catch(err) {
            console.error("Appwrite/Auth.js :: createAccount() :: error", err);
        }
    }

    async login({email, password}) {
        try {
            const session = await this.account.createEmailPasswordSession({
                email, password
            });

            return session;
        }
        catch(err) {
            console.error("Appwrite/Auth.js :: login() :: error", err);
        }
    }

    async getCurrUser() {
        try {
            return await this.account.get();
        }
        catch(err) {
            console.error("Appwrite/Auth.js :: getCurrUser() :: error", err);
        }

        // if unable to fetch account status, then return null (error handling)
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        }
        catch(err) {
            console.error("Appwrite/Auth.js :: logout() :: error", err);
        }
    }
}

const authService = new AuthService(); 

export default authService;