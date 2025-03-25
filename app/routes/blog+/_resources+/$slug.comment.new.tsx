import { data } from "react-router";
import type { Route } from "./+types/$slug.comment.new";
import { getDB } from "~/middleware/db.server";
import { comments } from "~/db/schema/comments";
import { href } from "react-router";
import { useFetcher } from "react-router";
import { useEffect, useRef } from "react";

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

export const CommentForm = ({ slug }: { slug: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const commentFetcher = useFetcher<Route.ComponentProps["actionData"]>();

  // コメント投稿成功時にフォームをリセットする
  useEffect(() => {
    if (commentFetcher.state !== "idle") return;
    if (commentFetcher.data?.success) {
      formRef.current?.reset();
    }
  }, [commentFetcher.state, commentFetcher?.data?.success]);
  return (
    <commentFetcher.Form
      ref={formRef}
      method="post"
      action={href("/blog/:slug/comment/new", { slug })}
    >
      <h3>Comment to This Post</h3>
      <input name="content" type="text" />
      <button type="submit">add comment</button>
      {commentFetcher.data?.message && <p>{commentFetcher.data.message}</p>}
    </commentFetcher.Form>
  );
};
