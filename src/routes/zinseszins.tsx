import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopicPage, Box } from "@/components/TopicPage";

export const Route = createFileRoute("/zinseszins")({
  head: () => ({ meta: [
    { title: "Zinseszins-Rechner – Geldstart" },
    { name: "description", content: "Erlebe den Zinseszinseffekt mit einem einfachen Rechner." },
    { property: "og:title", content: "Zinseszins einfach erklärt" },
    { property: "og:description", content: "Probier aus, wie dein Geld mit der Zeit wächst." },
  ] }),
  component: Page,
});

export function calc(monthly: number, rate: number, years: number) {
  const rows: { year: number; paid: number; total: number }[] = [];
  let total = 0;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) total = (total + monthly) * (1 + rate / 100 / 12);
    rows.push({ year: y, paid: monthly * 12 * y, total });
  }
  return rows;
}

const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function Slider({ label, value, set, min, max, step, unit }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; unit: string }) {
  return (
    <label className="block">
      <div className="flex justify-between font-semibold"><span>{label}</span><span>{value} {unit}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" />
    </label>
  );
}

function Page() {
  const [monthly, setMonthly] = useState(50);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(40);
  const rows = calc(monthly, rate, years);
  const last = rows[rows.length - 1]!;
  const max = last.total;
  return (
    <TopicPage emoji="📈" title="Zinseszins" intro="Du bekommst Zinsen – und später auch Zinsen auf deine Zinsen. Dadurch wächst dein Geld immer schneller." next="/anlageklassen">
      <Box title="So funktioniert's">
        <p>Du legst 100 € an und bekommst 5 % Zinsen. Nach einem Jahr hast du 105 €.</p>
        <p>Im zweiten Jahr bekommst du 5 % auf <b>105 €</b> – also 110,25 €. Das ist der Zinseszins.</p>
      </Box>
      <section className="card-pop space-y-5 p-5">
        <h2 className="text-xl font-bold">Probier's aus</h2>
        <Slider label="Pro Monat" value={monthly} set={setMonthly} min={10} max={300} step={10} unit="€" />
        <Slider label="Rendite pro Jahr" value={rate} set={setRate} min={0} max={10} step={0.5} unit="%" />
        <Slider label="Dauer" value={years} set={setYears} min={1} max={50} step={1} unit="Jahre" />
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted p-4"><div className="text-sm text-muted-foreground">Eingezahlt</div><div className="text-2xl font-bold">{eur(last.paid)}</div></div>
          <div className="rounded-xl bg-accent p-4"><div className="text-sm">Am Ende</div><div className="text-2xl font-bold">{eur(last.total)}</div></div>
        </div>
        <div className="flex h-40 items-end gap-[2px]">
          {rows.map((r) => (
            <div key={r.year} className="relative flex-1" style={{ height: `${(r.total / max) * 100}%` }}>
              <div className="absolute inset-0 rounded-t bg-primary" />
              <div className="absolute inset-x-0 bottom-0 rounded-t bg-accent" style={{ height: `${(r.paid / r.total) * 100}%` }} />
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Hell = dein eingezahltes Geld · Dunkel = Zinseszins</p>
      </section>
      <Box tone="tip" title="Merke">
        <p>Wer mit 16 statt mit 30 anfängt, hat oft am Ende deutlich mehr – obwohl er kaum mehr eingezahlt hat. Zeit schlägt Betrag!</p>
      </Box>
    </TopicPage>
  );
}
