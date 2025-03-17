import { defineRelations } from "drizzle-orm";
import { posts } from "./schema/posts";

export const relations = defineRelations(
  {
    posts,
  },
  (r) => ({})
);
