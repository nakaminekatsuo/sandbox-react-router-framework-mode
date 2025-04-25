import { Main } from "~/domain/layout/main";
import type { Route } from "./+types/_route";
import { data, href, Link, redirect } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { color } from "~/lib/stylex/tokens.stylex";
import { getDB } from "~/middleware/db.server";
import { posts } from "~/db/schema/posts";
import { EditPostForm } from "../edit-post-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Create Post | Blog` },
    { name: "description", content: "create post." },
  ];
}

export default function Page({ actionData }: Route.ComponentProps) {
  return (
    <Main>
      <h2 {...stylex.props(styles.title)}>Create Post</h2>
      <Link to={href("/blog")}>back</Link>
      <div {...stylex.props(styles.line)} />
      <EditPostForm errors={actionData?.errors} />
    </Main>
  );
}

const styles = stylex.create({
  title: {
    margin: 0,
  },
  line: {
    height: 1,
    backgroundColor: color.foreground,
  },
});

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));

  if (!title || !content) {
    return data(
      {
        errors: {
          title: !title ? "タイトルを入力してください" : undefined,
          content: !content ? "コンテンツを入力してください" : undefined,
        },
      },
      400
    );
  }

  const db = getDB(context);
  await db.insert(posts).values({
    title,
    content,
  });

  return redirect(href("/blog"));
}
