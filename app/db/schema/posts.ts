import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestampColumns } from "./helpers/timestampColumns";

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: uuid().defaultRandom().notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  ...timestampColumns,
});
