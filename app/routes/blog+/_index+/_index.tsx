import * as stylex from "@stylexjs/stylex";
import type { Route } from "./+types/_index";
import { Main } from "~/domain/layout/main";
import React from "react";
import { color, space } from "~/lib/stylex/tokens.stylex";
import { Post } from "./_post";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog" },
    { name: "description", content: "Show posts I wrote." },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return {
    posts: [
      {
        slug: "hello-world",
        title: "Hello, world!",
        createdAt: "2024-01-01",
        content: "This is my first post.",
      },
      {
        slug: "second-post",
        title: "Second post",
        createdAt: "2024-01-01",
        content: "This is my second post.",
      },
    ],
  };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Main>
      <div {...stylex.props(styles.root)}>
        <div>
          <h2 {...stylex.props(styles.title)}>Blog</h2>
          <Link to="/blog/new">New post</Link>
          <div {...stylex.props(styles.line)} />
        </div>
        {loaderData.posts.map((post) => (
          <React.Fragment key={post.slug}>
            <Post key={post.title} {...post} />
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
    margin: 0,
  },
  line: {
    height: 1,
    backgroundColor: color.line,
  },
});
