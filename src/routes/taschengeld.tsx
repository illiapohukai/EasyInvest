import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopicPage, Box } from "@/components/TopicPage";
import { calc, Slider } from "./zinseszins";

const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export const Route = createFileRoute("/taschengeld")({
  head: () => ({ meta: [
    { title: "Budget- & Taschengeld-Rechner – Geldstart" },
    { name: "description", content: "Monatliche Einnahmen und Ausgaben planen und ausrechnen, was du vom Taschengeld sparen kannst." },
    { property: "og:title", content: "Budget- & Taschengeld-Rechner" },
    { property: "og:description", content: "Einnahmen, Ausgaben, Sparen – einfach ausrechnen." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
});

type Row = { name: string; value: number };

function List({ title, rows, set }: { title: string; rows: Row[]; set: (r: Row[]) => void }) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold">{title}</h3>
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          <input className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2" value={r.name}
            onChange={(e) => set(rows.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          <input type="number" min={0} className="w-24 rounded-lg border border-input bg-background px-3 py-2 text-right" value={r.value}
            onChange={(e) => set(rows.map((x, j) => (j === i ? { ...x, value: Math.max(0, +e.target.value) } : x)))} />
          <button aria-label="Entfernen" className="px-2 text-muted-foreground" onClick={() => set(rows.filter((_, j) => j !== i))}>✕</button>
        </div>
      ))}
      <button className="text-sm font-semibold underline" onClick={() => set([...rows, { name: "Neu", value: 0 }])}>+ Zeile hinzufügen</button>
    </div>
  );
}

function Page() {
  const [inc, setInc] = useState<Row[]>([{ name: "Taschengeld", value: 60 }, { name: "Minijob", value: 150 }]);
  const [out, setOut] = useState<Row[]>([{ name: "Handy", value: 15 }, { name: "Essen & Trinken", value: 50 }, { name: "Freizeit", value: 60 }]);
  const sumIn = inc.reduce((a, r) => a + r.value, 0);
  const sumOut = out.reduce((a, r) => a + r.value, 0);
  const rest = sumIn - sumOut;

  const [save, setSave] = useState(20);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(5);
  const last = calc(save, rate, years).at(-1)!;

  return (
    <TopicPage emoji="🧮" title="Budget & Taschengeld" intro="Erst wissen, wo dein Geld hingeht – dann sparen. Trag deine Zahlen ein.">
      <section className="card-pop space-y-5 p-5">
        <h2 className="text-xl font-bold">Monatlicher Ein- & Ausgabenrechner</h2>
        <List title="💰 Einnahmen (€ pro Monat)" rows={inc} set={setInc} />
        <List title="🛍️ Ausgaben (€ pro Monat)" rows={out} set={setOut} />
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-muted p-3"><div className="text-xs text-muted-foreground">Einnahmen</div><div className="text-xl font-bold">{eur(sumIn)}</div></div>
          <div className="rounded-xl bg-muted p-3"><div className="text-xs text-muted-foreground">Ausgaben</div><div className="text-xl font-bold">{eur(sumOut)}</div></div>
          <div className={`rounded-xl p-3 ${rest >= 0 ? "bg-accent" : "bg-destructive text-destructive-foreground"}`}><div className="text-xs">Übrig</div><div className="text-xl font-bold">{eur(rest)}</div></div>
        </div>
        <p className="text-sm">{rest > 0 ? `Super! Du könntest bis zu ${eur(rest)} im Monat sparen.` : rest === 0 ? "Alles verplant – schau, wo du etwas kürzen kannst." : "Du gibst mehr aus, als du hast. Kürze Ausgaben!"}</p>
        {rest > 0 && <button className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground" onClick={() => setSave(Math.min(300, Math.round(rest / 5) * 5))}>Übrigen Betrag in den Sparrechner übernehmen ↓</button>}
      </section>

      <section className="card-pop space-y-5 p-5">
        <h2 className="text-xl font-bold">Taschengeld-Sparrechner</h2>
        <Slider label="Sparen pro Monat" value={save} set={setSave} min={5} max={300} step={5} unit="€" />
        <Slider label="Rendite pro Jahr" value={rate} set={setRate} min={0} max={10} step={0.5} unit="%" />
        <Slider label="Zeitraum" value={years} set={setYears} min={1} max={30} step={1} unit="Jahre" />
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-muted p-3"><div className="text-xs text-muted-foreground">Eingezahlt</div><div className="text-xl font-bold">{eur(last.paid)}</div></div>
          <div className="rounded-xl bg-highlight/40 p-3"><div className="text-xs">Rendite</div><div className="text-xl font-bold">+{eur(last.total - last.paid)}</div></div>
          <div className="rounded-xl bg-accent p-3"><div className="text-xs">Am Ende</div><div className="text-xl font-bold">{eur(last.total)}</div></div>
        </div>
        <p className="text-sm text-muted-foreground">0 % = Sparschwein, ca. 2–3 % = Tagesgeld, 5–7 % = ETF (geschätzt, schwankt).</p>
      </section>

      <Box tone="tip" title="Tipp: Erst sparen, dann ausgeben">
        <p>Leg den Sparbetrag gleich am Monatsanfang zur Seite – nicht nur das, was am Ende übrig bleibt.</p>
      </Box>
    </TopicPage>
  );
}
