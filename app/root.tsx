import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";

import "./app.css";
import type { Route } from "./+types/root";
import { envMiddleware } from "./middleware/env.server";
import { logRequestDurationMiddleware } from "./middleware/logRequestDuration";
import { RootLayout } from "./domain/layout/root-layout";
import { dbMiddleware } from "./middleware/db.server";
import { prefs } from "./session/prefs.server";
import type { W } from "node_modules/react-router/dist/development/fog-of-war-Da8gpnoZ.mjs";

export const unstable_middleware = [
  logRequestDurationMiddleware,
  envMiddleware,
  dbMiddleware,
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  return {
    theme: cookie.theme,
  };
}

export const useRootLoaderData = () => {
  const rootData = useRouteLoaderData<typeof loader>("root");
  if (!rootData) {
    throw new Error("Root loader data not found");
  }
  return rootData;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <RootLayout theme={loaderData.theme ?? "system"}>
      <Outlet />
    </RootLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
