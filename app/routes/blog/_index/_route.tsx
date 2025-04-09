import * as stylex from "@stylexjs/stylex";
import type { Route } from "./+types/_route";
import { Main } from "~/domain/layout/main";
import React from "react";
import { color, space, thickness } from "~/lib/stylex/tokens.stylex";
import { Post } from "../post";
import { Link } from "react-router";
import { getDB } from "~/middleware/db.server";
import { comments } from "~/db/schema/comments";
import { eq } from "drizzle-orm";
import { href } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog" },
    { name: "description", content: "Show posts I wrote." },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = getDB(context);
  const posts = await db.query.posts.findMany({
    columns: {
      slug: true,
      title: true,
      content: true,
      createdAt: true,
    },
    extras: {
      totalCommentsCount: (table) =>
        db.$count(comments, eq(table.id, comments.postId)),
    },
  });
  return {
    posts,
  };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Main>
      <div {...stylex.props(styles.root)}>
        <div>
          <h2 {...stylex.props(styles.title)}>Blog</h2>
          <Link to={href("/blog/create")}>Create Post</Link>
          <div {...stylex.props(styles.line)} />
        </div>
        {loaderData.posts.map((post) => (
          <React.Fragment key={post.slug}>
            <Post {...post} />
            <div {...stylex.props(styles.line)} />
          </React.Fragment>
        ))}
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
    height: thickness.xxs,
    backgroundColor: color.line,
  },
});
