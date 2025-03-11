import type { Route } from "./+types/_layout";
import { logRequestDurationMiddleware } from "~/middleware/logRequestDuration";
import { envMiddleware } from "~/middleware/env.server";
import { Outlet } from "react-router";

export const unstable_middleware = [
  logRequestDurationMiddleware,
  envMiddleware,
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <div>layout</div>
      <Outlet />
    </div>
  );
}
