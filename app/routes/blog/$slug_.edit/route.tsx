import { Main } from "~/domain/layout/main";
import type { Route } from "./+types/route";
import { data, href, Link, redirect } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { getDB } from "~/middleware/db.server";
import { color, space } from "~/lib/stylex/tokens.stylex";
import { EditPostForm } from "../edit-post-form";
import { posts } from "~/db/schema/posts";
import { eq } from "drizzle-orm";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.slug} | Blog` },
    { name: "description", content: "show post." },
  ];
}

export async function loader({ params, context }: Route.LoaderArgs) {
  const db = getDB(context);
  const post = await db.query.posts
    .findFirst({
      columns: {
        slug: true,
        title: true,
        content: true,
        createdAt: true,
      },
      where: {
        slug: params.slug,
      },
    })
    .catch(() => {
      throw data("無効なパラメータです", 400);
    });

  if (!post) {
    throw data("ポストが存在しません", 404);
  }
  return { post };
}

export default function Page({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <Main>
      <div {...stylex.props(styles.root)}>
        <div>
          <h2 {...stylex.props(styles.title)}>Edit Post</h2>
          <Link to={href("/blog")}>back</Link>
          <div {...stylex.props(styles.line)} />
        </div>
        <EditPostForm
          defaultValues={loaderData.post}
          errors={actionData?.errors}
        />
        <div {...stylex.props(styles.line)} />
      </div>
    </Main>
  );
}
const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: space.md,
  },
  title: {
    color: color.mainText,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: color.line,
  },
});

export async function action({ request, params, context }: Route.ActionArgs) {
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
  const result = await db
    .update(posts)
    .set({
      title,
      content,
    })
    .where(eq(posts.slug, params.slug));
  if (result?.length === 0) {
    return data(null, 400);
  }
  return redirect(href("/blog/:slug", { slug: params.slug }));
}
