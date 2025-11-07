import { IStorage } from './storage.mongo';
import { MongoStorage } from './storage.mongo';
import { DatabaseStorage } from './storage.postgres';

let storageInstance: IStorage;

export async function initializeStorage(): Promise<IStorage> {
  if (storageInstance) return storageInstance;

  const kind = (process.env.STORAGE || "mongo").toLowerCase();
  
  if (kind === "mongo" || kind === "mongodb") {
    storageInstance = new MongoStorage();
  } else {
    storageInstance = new DatabaseStorage();
  }
  
  return storageInstance;
}

export function getStorage(): IStorage {
  if (!storageInstance) {
    throw new Error('Storage not initialized. Call initializeStorage() first.');
  }
  return storageInstance;
}
