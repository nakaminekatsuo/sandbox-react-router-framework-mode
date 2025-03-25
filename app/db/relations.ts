import { defineRelations } from "drizzle-orm";
import { posts } from "./schema/posts";
import { comments } from "./schema/comments";

export const relations = defineRelations(
  {
    posts,
    comments,
  },
  (r) => ({
    posts: {
      comments: r.many.comments(),
    },
    comments: {
      post: r.one.posts({
        from: r.comments.postId,
        to: r.posts.id,
      }),
    },
  })
);
