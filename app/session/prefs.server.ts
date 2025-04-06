import { createCookie } from "react-router";

export const prefs = createCookie("prefs", {
  maxAge: 60_000,
});
