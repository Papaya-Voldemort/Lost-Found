import { Client, Account, ID, Databases, Storage, Query } from 'https://cdn.jsdelivr.net/npm/appwrite@22.4.1/+esm';

const client = new Client()
    .setEndpoint('https://sfo.cloud.appwrite.io/v1')
    .setProject('699e50900027f1754b0f'); // Change these if we switch instances

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID, Query };
