import { getMongoDb } from './mongo';
import { MongoStorage } from './storage.mongo';
import { Storage } from './storage';

let storage: Storage;

export async function initializeStorage(): Promise<Storage> {
  if (storage) return storage;
  
  const storageType = process.env.STORAGE || 'mongo';
  
  if (storageType === 'mongo') {
    const db = await getMongoDb();
    storage = new MongoStorage(db);
  } else {
    throw new Error(`Unsupported storage type: ${storageType}`);
  }
  
  return storage;
}

export function getStorage(): Storage {
  if (!storage) {
    throw new Error('Storage not initialized. Call initializeStorage() first.');
  }
  return storage;
}
