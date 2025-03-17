import * as stylex from "@stylexjs/stylex";
import { space } from "~/lib/stylex/tokens.stylex";

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <main {...stylex.props(styles.root)}>{children}</main>;
};

const styles = stylex.create({
  root: {
    paddingTop: space.lg,
    paddingLeft: space.sm,
    paddingRight: space.sm,
  },
});
