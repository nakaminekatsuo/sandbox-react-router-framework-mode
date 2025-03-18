import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";
import { dbUrl } from "drizzle.config";

export const createDBInstance = () => drizzle(dbUrl, { relations });

export type DB = ReturnType<typeof createDBInstance>;
