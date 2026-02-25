import { Client, Account, ID } from 'https://cdn.jsdelivr.net/npm/appwrite@22.4.1/+esm';

const client = new Client()
    .setEndpoint('https://sfo.cloud.appwrite.io/v1')
    .setProject('699e50900027f1754b0f'); // Change these if we switch instances

const account = new Account(client);

export { client, account, ID };
