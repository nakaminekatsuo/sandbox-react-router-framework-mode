import { getEnv } from "~/middleware/env.server";
import type { Route } from "./+types/_index";
import { Welcome } from "./_welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  const env = getEnv(context);
  console.log(env);
  return {};
}

export default function Home() {
  return <Welcome />;
}
