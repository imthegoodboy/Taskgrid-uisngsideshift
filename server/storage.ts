export type IStorage = any;

const kind = (process.env.STORAGE || "postgres").toLowerCase();
let storageInstance: IStorage;

if (kind === "mongo" || kind === "mongodb") {
  const mod = await import("./storage.mongo");
  storageInstance = new mod.MongoStorage();
} else {
  const mod = await import("./storage.postgres");
  storageInstance = new mod.DatabaseStorage();
}

export const storage: IStorage = storageInstance;
