import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { topics } from "@/lib/topics";

export function TopicPage({
  emoji, title, intro, children, next,
}: { emoji: string; title: string; intro: string; children: ReactNode; next?: (typeof topics)[number]["to"] }) {
  const n = topics.find((t) => t.to === next);
  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Alle Themen</Link>
      <div className="mt-6 text-5xl">{emoji}</div>
      <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{intro}</p>
      <div className="mt-8 space-y-5">{children}</div>
      {n && (
        <Link to={n.to} className="card-pop mt-10 flex items-center justify-between bg-accent p-5 font-bold">
          <span>Weiter: {n.emoji} {n.title}</span><span>→</span>
        </Link>
      )}
    </main>
  );
}

export function Box({ title, children, tone = "card" }: { title?: string; children: ReactNode; tone?: "card" | "tip" | "warn" }) {
  const bg = tone === "tip" ? "bg-secondary" : tone === "warn" ? "bg-highlight/30" : "bg-card";
  return (
    <section className={`card-pop p-5 ${bg}`}>
      {title && <h2 className="mb-2 text-xl font-bold">{title}</h2>}
      <div className="space-y-2 leading-relaxed">{children}</div>
    </section>
  );
}
