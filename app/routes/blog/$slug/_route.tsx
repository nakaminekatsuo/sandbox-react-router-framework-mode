import { Main } from "~/domain/layout/main";
import type { Route } from "./+types/_route";
import { data, href, Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { getDB } from "~/middleware/db.server";
import { Post } from "../post";
import { color, space, textSize } from "~/lib/stylex/tokens.stylex";
import { DeletePostButton } from "./delete-post-button";
import { comments } from "~/db/schema/comments";
import { eq } from "drizzle-orm";
import { CommentForm } from "~/routes/blog._resources+/$slug.comment.new/comment-form";

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
      with: {
        comments: {
          columns: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      extras: {
        totalCommentsCount: (table) =>
          db.$count(comments, eq(table.id, comments.postId)),
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

export default function Page({ loaderData, params }: Route.ComponentProps) {
  return (
    <Main>
      <div {...stylex.props(styles.root)}>
        <div>
          <h2 {...stylex.props(styles.title)}>Post</h2>
          <div {...stylex.props(styles.actionBlock)}>
            <Link to={href("/blog")}>back</Link>
            <DeletePostButton slug={loaderData.post.slug} />
          </div>
          <div {...stylex.props(styles.line)} />
        </div>
        <Post {...loaderData.post} />
        <div {...stylex.props(styles.line)} />
        <div {...stylex.props(commentsStyles.root)}>
          <h3 {...stylex.props(commentsStyles.heading)}>Comments</h3>
          {loaderData.post.comments.map((comment) => (
            <div key={comment.id}>
              <p {...stylex.props(commentsStyles.commentLabel)}>{comment.content}</p>
              <p {...stylex.props(commentsStyles.createdAtLabel)}>{comment.createdAt.toDateString()}</p>
            </div>
          ))}
          <CommentForm slug={params.slug} />
        </div>
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
    color: color.foreground,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: color.foreground,
  },
  actionBlock: {
    display: "flex",
    gap: space.sm,
  },
});

const commentsStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.md,
  },
  heading: {
    fontSize: textSize.lg,
    color: color.foreground
  },
  commentLabel: {
    fontSize: textSize.md,
    color: color.foreground
  },
  createdAtLabel: {
    fontSize: textSize.xs,
    color: color.foreground
  },
})