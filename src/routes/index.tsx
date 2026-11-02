import { createFileRoute, Link } from "@tanstack/react-router";
import { topics, ZUKUNFTSDEPOT_URL } from "@/lib/topics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Geldstart – Geldanlage einfach erklärt für 16- bis 20-Jährige" },
      { name: "description", content: "Lerne Grundlagen, Zinseszins, Anlageklassen und staatliche Förderung – in einfacher Sprache." },
      { property: "og:title", content: "Geldstart – Geldanlage einfach erklärt" },
      { property: "og:description", content: "Geldanlage für junge Leute: einfach, kurz, verständlich." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <p className="inline-block rounded-full bg-highlight px-3 py-1 text-sm font-bold text-highlight-foreground">Für 16 – 20 Jahre</p>
      <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl">
        Dein Geld kann <span className="rounded-lg bg-accent px-2">für dich arbeiten.</span>
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">
        Kurz und einfach erklärt: So fängst du an. Wähl ein Thema – jedes dauert nur ein paar Minuten.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <Link key={t.to} to={t.to} className="card-pop group p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-4xl">{t.emoji}</span>
              <span className="text-sm font-bold text-muted-foreground">0{i + 1}</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold">{t.title}</h2>
            <p className="mt-1 text-muted-foreground">{t.text}</p>
          </Link>
        ))}
      </div>

      <section className="card-pop mt-12 bg-primary p-8 text-primary-foreground">
        <h2 className="text-3xl font-extrabold">Bereit loszulegen?</h2>
        <p className="mt-2 max-w-lg opacity-90">Mit dem Zukunftsdepot kannst du schon mit kleinen Beträgen anfangen.</p>
        <a href={ZUKUNFTSDEPOT_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground">Zum Zukunftsdepot ↗</a>
      </section>
    </main>
  );
}
