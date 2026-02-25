import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite';
import 'dotenv/config';

// Load environmental variables
const endpoint = process.env.APPWRITE_ENDPOINT || 'https://sfo.cloud.appwrite.io/v1';
const projectId = process.env.APPWRITE_PROJECT_ID || '699e50900027f1754b0f';
const apiKey = process.env.APPWRITE_API_KEY;

if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    console.error('Error: Please provide a valid APPWRITE_API_KEY in the .env file.');
    process.exit(1);
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);
const storage = new Storage(client);

const DB_ID = 'traceback_db';
const DB_NAME = 'TracebackDB';
const COLLECTION_ID = 'items';
const COLLECTION_NAME = 'Items';
const BUCKET_ID = 'item_images';
const BUCKET_NAME = 'Item Images';

async function setup() {
    console.log('--- Traceback Appwrite Setup Started ---');

    // 1. Database Creation
    try {
        await databases.get(DB_ID);
        console.log(`- Database "${DB_NAME}" (${DB_ID}) already exists.`);
    } catch (e) {
        console.log(`- Creating Database: ${DB_NAME}...`);
        await databases.create(DB_ID, DB_NAME);
    }

    // 2. Collection Creation
    try {
        await databases.getCollection(DB_ID, COLLECTION_ID);
        console.log(`- Collection "${COLLECTION_NAME}" (${COLLECTION_ID}) already exists.`);
    } catch (e) {
        console.log(`- Creating Collection: ${COLLECTION_NAME}...`);
        // We set permissions so any user can read, but only logged-in users can create documents.
        // For individual manageability, the code during creation will add more specific permissions later.
        await databases.createCollection(
            DB_ID,
            COLLECTION_ID,
            COLLECTION_NAME,
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
            ]
        );
    }

    // 3. Attributes Creation (We check for existing ones to avoid crashes)
    console.log('- Setting up Attributes...');
    const currentAttrs = (await databases.listAttributes(DB_ID, COLLECTION_ID)).attributes.map(a => a.key);

    const attributesToAdd = [
        { key: 'type', type: 'string', size: 16, required: true },
        { key: 'title', type: 'string', size: 128, required: true },
        { key: 'description', type: 'string', size: 1024, required: true },
        { key: 'location', type: 'string', size: 256, required: true },
        { key: 'date', type: 'datetime', required: true },
        { key: 'tags', type: 'string', size: 36, array: true, required: false }, // Store as array of strings
        { key: 'imageId', type: 'string', size: 36, required: true },
        { key: 'userId', type: 'string', size: 36, required: true },
        { key: 'status', type: 'string', size: 16, required: false, default: 'active' }
    ];

    for (const attr of attributesToAdd) {
        if (currentAttrs.includes(attr.key)) {
            console.log(`  - Attribute "${attr.key}" already exists.`);
            continue;
        }

        console.log(`  - Creating Attribute: ${attr.key}...`);
        if (attr.type === 'string') {
            await databases.createStringAttribute(DB_ID, COLLECTION_ID, attr.key, attr.size, attr.required, attr.default, attr.array);
        } else if (attr.type === 'datetime') {
            await databases.createDatetimeAttribute(DB_ID, COLLECTION_ID, attr.key, attr.required, attr.default);
        }
        // Give time for backend to index or handle consecutive calls
        await new Promise(r => setTimeout(r, 1000));
    }

    // 4. Bucket Creation
    try {
        await storage.getBucket(BUCKET_ID);
        console.log(`- Bucket "${BUCKET_NAME}" (${BUCKET_ID}) already exists.`);
    } catch (e) {
        console.log(`- Creating Bucket: ${BUCKET_NAME}...`);
        await storage.createBucket(
            BUCKET_ID,
            BUCKET_NAME,
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ],
            false, // File-level security (set to false for simplicity, using bucket-level for now)
            true,  // Enabled
            undefined, // Max size
            ['jpg', 'png', 'webp', 'jpeg', 'heic'], // Allowed extensions
            undefined, // Compression
            true, // Encryption
            true  // Antivirus
        );
    }

    console.log('\n--- Setup Complete! ---');
    console.log('You can now report and manage items in Traceback.');
    console.log(`Database ID: ${DB_ID}`);
    console.log(`Collection ID: ${COLLECTION_ID}`);
    console.log(`Bucket ID: ${BUCKET_ID}`);
}

setup().catch(error => {
    console.error(`\n!!! Setup Failed: ${error.message}`);
    process.exit(1);
});