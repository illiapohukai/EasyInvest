import { createFileRoute } from "@tanstack/react-router";
import { TopicPage } from "@/components/TopicPage";

const classes = [
  { e: "🏦", n: "Tagesgeld & Festgeld", d: "Geld liegt sicher bei der Bank und bringt etwas Zinsen.", r: 1, c: 1,
    more: ["Tagesgeld: jederzeit verfügbar, Zins kann sich ändern.", "Festgeld: Geld ist für eine feste Zeit gebunden, dafür fester Zins.", "Bis 100.000 € pro Bank durch die Einlagensicherung geschützt.", "Gut für: Notgroschen (ca. 3 Monatsausgaben)."] },
  { e: "📜", n: "Anleihen", d: "Du leihst einem Staat oder einer Firma Geld und bekommst Zinsen.", r: 2, c: 2,
    more: ["Am Ende der Laufzeit bekommst du dein Geld zurück – wenn der Schuldner zahlen kann.", "Staatsanleihen (z. B. Deutschland) gelten als sicher, Firmenanleihen als riskanter.", "Einfach gestreut über Anleihen-ETFs."] },
  { e: "🏢", n: "Aktien", d: "Du kaufst ein kleines Stück einer Firma. Der Wert schwankt stark.", r: 4, c: 4,
    more: ["Du bist Miteigentümer und kannst Dividenden (Gewinnanteile) bekommen.", "Einzelne Firmen können pleitegehen – deshalb nie alles auf eine Aktie setzen.", "Langfristig hatten Aktien die höchsten Renditen, kurzfristig sind Verluste normal."] },
  { e: "🧺", n: "ETFs", d: "Ein Korb mit vielen Aktien auf einmal. Breit gestreut und günstig – beliebt für Einsteiger.", r: 3, c: 4,
    more: ["Ein ETF bildet einen Index nach, z. B. den MSCI World mit ca. 1.500 Firmen weltweit.", "Niedrige Kosten (oft 0,1–0,3 % pro Jahr).", "Per Sparplan schon ab 1–25 € im Monat möglich.", "Ideal für langes Sparen (10+ Jahre)."] },
  { e: "🏠", n: "Immobilien", d: "Häuser und Wohnungen. Braucht meist viel Geld – oder geht über Fonds.", r: 3, c: 3,
    more: ["Eigene Wohnung: viel Eigenkapital, Kredit und Verantwortung nötig.", "Alternative: Immobilienfonds oder REIT-ETFs mit kleinen Beträgen.", "Bringt Mieteinnahmen, ist aber schwer schnell zu verkaufen."] },
  { e: "🪙", n: "Gold & Krypto", d: "Kein Zins, starke Schwankungen. Krypto ist sehr riskant – höchstens ein kleiner Teil.", r: 5, c: 3,
    more: ["Gold gilt als Krisenschutz, bringt aber keine Zinsen.", "Krypto (z. B. Bitcoin) kann sich in Tagen halbieren oder verdoppeln.", "Achtung vor Betrug auf Social Media! Nur Geld einsetzen, dessen Verlust du verkraftest."] },
];

const Dots = ({ n, label }: { n: number; label: string }) => (
  <div className="flex items-center gap-2 text-sm"><span className="w-14 text-muted-foreground">{label}</span>
    {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`h-3 w-3 rounded-full border border-foreground ${i <= n ? "bg-foreground" : ""}`} />)}
  </div>
);

export const Route = createFileRoute("/anlageklassen")({
  head: () => ({ meta: [
    { title: "Anlageklassen einfach erklärt – Geldstart" },
    { name: "description", content: "Tagesgeld, Anleihen, Aktien, ETFs, Immobilien und Krypto im Überblick." },
    { property: "og:title", content: "Anlageklassen einfach erklärt" },
    { property: "og:description", content: "Welche Geldanlage passt zu dir? Der Überblick." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => (
    <TopicPage emoji="🧺" title="Anlageklassen" intro="Es gibt verschiedene Arten, Geld anzulegen. Tipp auf eine Karte, um mehr zu erfahren." next="/kindergeld">
      {classes.map((k) => (
        <details key={k.n} className="card-pop group p-5">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold">{k.e} {k.n}</h2><span className="text-2xl transition-transform group-open:rotate-45">+</span></div>
            <p className="mt-1">{k.d}</p>
            <div className="mt-3 space-y-1"><Dots n={k.r} label="Risiko" /><Dots n={k.c} label="Chance" /></div>
          </summary>
          <ul className="mt-4 list-disc space-y-1 border-t border-border pl-5 pt-4">
            {k.more.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </details>
      ))}
    </TopicPage>
  ),
});
