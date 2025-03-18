import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";
import { dbUrl } from "drizzle.config";

const dbInstance = drizzle(dbUrl, { relations });
export const getDBInstance = () => dbInstance;

export type DB = typeof dbInstance;
