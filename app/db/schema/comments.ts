import { pgTable } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { timestampColumns } from "./helpers/timestamp-columns";

export const comments = pgTable("comments", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  content: t.varchar({ length: 255 }),
  postId: t.integer().notNull(),
  ...timestampColumns,
}));
