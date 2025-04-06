import * as stylex from "@stylexjs/stylex";
import { href, Link } from "react-router";
import { color, space } from "~/lib/stylex/tokens.stylex";

type Props = {
  slug: string;
  title: string;
  createdAt: Date;
  content: string;
  totalCommentsCount?: number;
};
export const Post = ({
  slug,
  title,
  createdAt,
  content,
  totalCommentsCount,
}: Props) => {
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
        <p {...stylex.props(styles.createdAt)}>{createdAt.toDateString()}</p>
        <span {...stylex.props(styles.comment)}>
          [comments: {totalCommentsCount ?? 0}]
        </span>
        <Link
          {...stylex.props(styles.link)}
          prefetch="intent"
          to={href("/blog/:slug/edit", { slug })}
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
    color: color.lightPrimary,
  },
  createdAt: {
    color: color.mainText,
  },
  content: {
    color: color.subText,
  },
  comment: {
    color: color.subText,
  },
  transparentLink: {
    color: "inherit",
    textDecorationColor: color.lightPrimary,
  },
  link: {
    color: color.secondary,
    textDecorationColor: color.secondary,
  },
  infoPart: {
    display: "flex",
    gap: space.sm,
  },
});
