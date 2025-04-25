import { href, redirect } from "react-router";
import type { Route } from "./+types/_routes"
import { getDB } from "~/middleware/db.server";
import { posts } from "~/db/schema/posts";
import { eq } from "drizzle-orm";
import { comments } from "~/db/schema/comments";

export async function action({ params, context }: Route.ActionArgs) {
  const db = getDB(context);
  const post = await db.query.posts.findFirst({
    columns: { id: true },
    where: {
      slug: params.slug,
    },
  });
  if (!post) {
    throw new Error("invalid parameter");
  }
  await db.delete(comments).where(eq(comments.postId, post.id));
  await db.delete(posts).where(eq(posts.slug, params.slug));
  return redirect(href("/blog"));
}
