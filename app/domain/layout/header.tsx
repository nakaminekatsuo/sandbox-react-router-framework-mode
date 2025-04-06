import * as stylex from "@stylexjs/stylex";
import { Link } from "react-router";
import { color, space, textSize } from "~/lib/stylex/tokens.stylex";
import { ToggleThemeButton } from "~/routes/_resouces+/toggleTheme";

export const Header = () => {
  return (
    <header {...stylex.props(styles.root)}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 {...stylex.props(styles.title)}>header</h1>
      </Link>
      <ToggleThemeButton />
    </header>
  );
};

const styles = stylex.create({
  root: {
    backgroundColor: color.primary,
    paddingLeft: space.sm,
  },
  title: {
    margin: 0,
    padding: 0,
    fontSize: textSize.x5l,
    color: color.onPrimary,
  },
});
