import { href, redirect } from "react-router";
import type { Route } from "./+types/$slug.delete";
import { getDB } from "~/middleware/db.server";
import { posts } from "~/db/schema/posts";
import { eq } from "drizzle-orm";

export async function action({ params, context }: Route.ActionArgs) {
  const db = getDB(context);
  await db.delete(posts).where(eq(posts.slug, params.slug));
  return redirect(href("/blog"));
}
