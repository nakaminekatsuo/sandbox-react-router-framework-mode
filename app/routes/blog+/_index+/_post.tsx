import * as stylex from "@stylexjs/stylex";
import { href, Link } from "react-router";
import { color, space } from "~/lib/stylex/tokens.stylex";

type Props = {
  slug: string;
  title: string;
  createdAt: string;
  content: string;
};
export const Post = ({ slug, title, createdAt, content }: Props) => {
  return (
    <div {...stylex.props(styles.root)}>
      <h3 {...stylex.props(styles.title)}>
        <Link
          {...stylex.props(styles.link)}
          prefetch="intent"
          to={href("/blog/:slug", { slug })}
        >
          {title}
        </Link>
      </h3>
      <p {...stylex.props(styles.createdAt)}>{createdAt}</p>
      <p {...stylex.props(styles.content)}>{content}</p>
    </div>
  );
};

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: space.xs,
  },
  title: {
    margin: 0,
    color: color.lightPrimary,
  },
  createdAt: {
    margin: 0,
    color: color.mainText,
  },
  content: {
    margin: 0,
    color: color.subText,
  },
  link: {
    margin: 0,
    color: "inherit",
    textDecorationColor: color.lightPrimary,
  },
});
