import type React from "react";
import * as stylex from "@stylexjs/stylex";
import { Header } from "./header";
import { color, space } from "~/lib/stylex/tokens.stylex";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div {...stylex.props(styles.root)}>
      <Header />
      <div {...stylex.props(styles.content)}>{children}</div>
      <footer {...stylex.props(styles.footer)}>footer</footer>
    </div>
  );
};

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    gap: space.xxs,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingLeft: space.xs,
    paddingRight: space.xs,
    backgroundColor: color.primary,
  },
});
