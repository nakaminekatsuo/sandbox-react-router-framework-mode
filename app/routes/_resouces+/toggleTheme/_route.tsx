import { prefs } from "~/session/prefs.server";
import type { Route } from "./+types/_route";
import { data} from "react-router";

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
  })
}