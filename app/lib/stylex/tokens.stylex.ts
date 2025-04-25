import * as stylex from "@stylexjs/stylex";

export const color = stylex.defineVars({
  primary: "#1e40af",
  background: "light-dark(#ffffff, #000000)",
  foreground: "light-dark(#1f2937, #f9fafb)",
});

export const textSize = stylex.defineVars({
  xxs: "10px",
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  x2l: "24px",
  x3l: "30px",
  x4l: "36px",
  x5l: "48px",
  x6l: "60px",
});

export const space = stylex.defineVars({
  xxs: "2px",
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  x2l: "40px",
  x4l: "56px",
  x6l: "72px",
});

export const thickness = stylex.defineVars({
  xxs: "1px",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "10px",
});

export const radius = stylex.defineVars({
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
});

export const opacity = stylex.defineVars({
  disabled: 0.5,
  placeholder: 0.5,
  loading: 0.5,
  outside: 0.5,
});

export const elevation = stylex.defineVars({
  xs: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  sm: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
  md: "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)",
  lg: "0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)",
  xl: "0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.05)",
});
