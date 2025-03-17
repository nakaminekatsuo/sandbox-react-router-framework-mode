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
          {...stylex.props(styles.transparentLink)}
          prefetch="intent"
          to={href("/blog/:slug", { slug })}
        >
          {title}
        </Link>
      </h3>
      <div {...stylex.props(styles.infoPart)}>
        <p {...stylex.props(styles.createdAt)}>{createdAt}</p>
        <Link
          {...stylex.props(styles.link)}
          prefetch="intent"
          // to={href("/blog/:slug/edit", { slug })}
          to="/" // TODO: 編集ページのリンクを追加する
        >
          [edit]
        </Link>
      </div>
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
  transparentLink: {
    margin: 0,
    color: "inherit",
    textDecorationColor: color.lightPrimary,
  },
  link: {
    margin: 0,
    color: color.secondary,
    textDecorationColor: color.secondary,
  },
  infoPart: {
    display: "flex",
    gap: space.sm,
  },
});
