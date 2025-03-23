import { Main } from "~/domain/layout/main";
import type { Route } from "./+types/_index";
import { data, href, Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { getDB } from "~/middleware/db.server";
import { Post } from "../_post";
import { color, space } from "~/lib/stylex/tokens.stylex";
import { DeletePostButton } from "../_delete-post-button";

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

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Main>
      <div {...stylex.props(styles.root)}>
        <div>
          <h2 {...stylex.props(styles.title)}>Create Post</h2>
          <div {...stylex.props(styles.actionBlock)}>
            <Link to={href("/blog")}>back</Link>
            <DeletePostButton slug={loaderData.post.slug} />
          </div>
          <div {...stylex.props(styles.line)} />
        </div>
        <Post {...loaderData.post} />
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
    margin: 0,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: color.line,
  },
  actionBlock: {
    display: "flex",
    gap: space.sm,
  },
});
