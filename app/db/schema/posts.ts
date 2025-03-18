import { pgTable } from "drizzle-orm/pg-core";
import { timestampColumns } from "./helpers/timestamp-columns";

export const posts = pgTable("posts", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: t.uuid().defaultRandom().notNull().unique(),
  title: t.varchar({ length: 255 }).notNull(),
  content: t.varchar({ length: 255 }).notNull(),
  ...timestampColumns,
}));
