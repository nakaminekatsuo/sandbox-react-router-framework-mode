import { getEnv } from "~/middleware/env.server";
import type { Route } from "./+types/_index";
import { Main } from "~/domain/layout/main";
import { Link } from "react-router";

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

export default function Page() {
  return (
    <Main>
      <h2>toppage</h2>
      <div>
        <Link to="/blog">blog</Link>
      </div>
    </Main>
  );
}
