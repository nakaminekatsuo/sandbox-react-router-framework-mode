import { data } from "react-router";
import type { Route } from "./+types/_route";
import { getDB } from "~/middleware/db.server";
import { comments } from "~/db/schema/comments";

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const content = String(formData.get("content"));
  if (content === "admin") {
    return data({ success: false, message: "nice try!", timestamp: null }, 400);
  }
  const db = getDB(context);
  const post = await db.query.posts.findFirst({
    columns: { id: true },
    where: { slug: params.slug },
  });
  if (!post) {
    return data(
      { success: false, message: "invalid parameter!", timestamp: null },
      400
    );
  }
  await db.insert(comments).values({ content, postId: post.id });
  // Note: javascriptをDisabledにした場合、comment formのactionのurlに遷移してしまう。
  return data({ success: true, message: "", timestamp: Date.now() }, 200);
  // return redirect(href("/blog/:slug", { slug: params.slug }));
}
