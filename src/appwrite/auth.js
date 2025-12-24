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
                // call another method
                return this.login(email, password);
            }
            else return userAcc;
        }
        catch(err) {
            console.log("Unable to Create Account: ");
            throw err;
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
            console.log("Unable to Login: ");
            throw err;
        }
    }

}

const authService = new AuthService(); 

export default authService;