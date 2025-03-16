import { Main } from "~/domain/layout/main";
import type { Route } from "./+types/_index";
import { href, Link } from "react-router";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.slug} | Blog` },
    { name: "description", content: "show post." },
  ];
}

export default function Page({ loaderData, params }: Route.ComponentProps) {
  return (
    <Main>
      <h2>{params.slug}</h2>
      <Link to={href("/blog")}>back</Link>
    </Main>
  );
}
