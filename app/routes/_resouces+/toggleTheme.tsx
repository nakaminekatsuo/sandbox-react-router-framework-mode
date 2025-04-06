import { prefs } from "~/session/prefs.server";
import type { Route } from "./+types/toggleTheme";
import { data, useFetcher } from "react-router";
import { useRootLoaderData } from "~/root";
import { href } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const formData = await request.formData();
  const theme = String(formData.get("theme"));
  cookie.theme = theme;
  return data(theme, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

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
