import type React from "react";
import * as stylex from "@stylexjs/stylex";
import { Header } from "./header";
import { color, space } from "~/lib/stylex/tokens.stylex";

export const RootLayout = ({
  theme,
  children,
}: {
  theme: keyof typeof themeStyles;
  children: React.ReactNode;
}) => {
  return (
    <div {...stylex.props(styles.root, themeStyles[theme])}>
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
    backgroundColor: color.background,
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
const themeStyles = stylex.create({
  light: {
    colorScheme: "light",
  },
  dark: {
    colorScheme: "dark",
  },
  system: {
    colorScheme: "light dark",
  },
});
