import { ID, Account, Client } from 'appwrite';
import { Button, Snackbar } from 'react-native-paper';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string =
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
type createUserAccount = {
  email: string;
  password: string;
  name: string;
};
type loginUserAccount = {
  email: string;
  password: string;
  name: string;
};

class AppwriteService {
  account;
  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setEndpoint(APPWRITE_PROJECT_ID);
    this.account = new Account(appwriteClient);
  }
  //create new record of user inside appwrite
  async createAccount({ email, password, name }: createUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        name,
        email,
        password
      );
      if (userAccount) {
        //create login feature
        return this.login({ email, password });
      }
    } catch (error) {
      Snackbar;
    }
  }

  async login({ email, password, name }: loginUserAccount) {
    try {
      await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(error, 'login failed');
    }
  }

  async getCurrentUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.log('current user');
    }
  }

  async getAccountDelete() {
    try {
      return this.account.deleteSession('current');
    } catch (error) {
      console.log('delet');
    }
  }
}

export default AppwriteService;
