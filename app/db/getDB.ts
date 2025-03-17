import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";
import { dbUrl } from "drizzle.config";

export const getDB = () => drizzle(dbUrl, { relations });
