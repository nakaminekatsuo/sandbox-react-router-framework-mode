import * as t from "drizzle-orm/pg-core";

export const timestampColumns = {
  updatedAt: t.timestamp(),
  createdAt: t.timestamp().defaultNow().notNull(),
  deletedAt: t.timestamp(),
};
