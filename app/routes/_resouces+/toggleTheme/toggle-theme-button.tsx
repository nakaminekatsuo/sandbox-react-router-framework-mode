import { href, useFetcher } from "react-router";
import { useRootLoaderData } from "~/root";
import type { action } from "./_route";

export const ToggleThemeButton = () => {
  const { theme } = useRootLoaderData();
  const themeFetcher = useFetcher<typeof action>();
  const optimisticTheme = themeFetcher?.formData?.get("theme") || theme;

  return (
    <themeFetcher.Form method="post" action={href("/toggleTheme")}>
      <input
        type="hidden"
        name="theme"
        value={theme === "light" ? "dark" : "light"}
      />
      <button type="submit">
        {optimisticTheme === "dark" ? "Dark Mode" : "Light Mode"}
      </button>
    </themeFetcher.Form>
  );
};