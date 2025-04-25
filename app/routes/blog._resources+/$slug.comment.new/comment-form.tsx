import { useEffect, useRef } from "react";
import { href, useFetcher } from "react-router";
import type { action } from "./_route";
import * as stylex from "@stylexjs/stylex"
import { color, textSize } from "~/lib/stylex/tokens.stylex";

export const CommentForm = ({ slug }: { slug: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const commentFetcher = useFetcher<typeof action>();

  // コメント投稿成功時にフォームをリセットする
  useEffect(() => {
    if (commentFetcher.state !== "idle") return;
    if (commentFetcher.data?.success) {
      formRef.current?.reset();
    }
  }, [commentFetcher.state, commentFetcher.data?.success]);
  return (
    <commentFetcher.Form
      ref={formRef}
      method="post"
      action={href("/blog/:slug/comment/new", { slug })}
    >
      <h3 {...stylex.props(styles.heading)}>Comment to This Post</h3>
      <input name="content" type="text" />
      <button type="submit">add comment</button>
      {commentFetcher.data?.message && <p>{commentFetcher.data.message}</p>}
    </commentFetcher.Form>
  );
};

const styles = stylex.create({
  heading: {
    fontSize: textSize.lg,
    color: color.foreground
  },
  commentLabel: {
    fontSize: textSize.lg,
    color: color.foreground
  },
  createdAtLabel: {
    fontSize: textSize.lg,
    color: color.foreground
  },
})