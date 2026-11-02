import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ZUKUNFTSDEPOT_URL } from "../lib/topics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Diese Seite gibt es nicht.</p>
        <Link to="/" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground">Zur Startseite</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-xl font-semibold">Die Seite konnte nicht geladen werden</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground">Nochmal versuchen</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Geldstart – Geldanlage einfach erklärt" },
      { name: "description", content: "Geldanlage für junge Leute von 16 bis 20 – einfach erklärt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Figtree:wght@400;600;700&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <header className="border-b-2 border-foreground bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-2xl font-extrabold">Geld<span className="rounded bg-accent px-1">start</span></Link>
          <a href={ZUKUNFTSDEPOT_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Zukunftsdepot ↗</a>
        </div>
      </header>
      <Outlet />
      <footer className="mx-auto max-w-5xl px-5 py-10 text-sm text-muted-foreground">
        Nur zur Bildung – keine Anlageberatung. Geldanlage kann auch Verluste bringen.
      </footer>
    </QueryClientProvider>
  );
}
