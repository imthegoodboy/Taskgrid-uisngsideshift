import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Support both PostgreSQL and MongoDB
const storageType = process.env.STORAGE || 'mongo';

if (storageType === 'postgres') {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set for PostgreSQL storage");
  }

  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle({ client: pool, schema });
} else {
  // For MongoDB compatibility
  export const db = null; // This will be handled by storage.mongo.ts
}
