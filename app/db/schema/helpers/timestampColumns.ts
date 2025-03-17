import { timestamp } from "drizzle-orm/pg-core";

export const timestampColumns = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
};
