import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopicPage, Box } from "@/components/TopicPage";
import { calc, Slider } from "./zinseszins";

const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const KINDERGELD = 255;

export const Route = createFileRoute("/kindergeld")({
  head: () => ({ meta: [
    { title: "Sparen vom Kindergeld – Geldstart" },
    { name: "description", content: "Rechne aus, was aus einem Teil vom Kindergeld werden kann." },
    { property: "og:title", content: "Sparen vom Kindergeld" },
    { property: "og:description", content: "Kleine Beträge, große Wirkung – mit Rechner." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
});

function Page() {
  const [monthly, setMonthly] = useState(50);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const last = calc(monthly, rate, years).at(-1)!;
  const gain = last.total - last.paid;
  const quote = Math.round((monthly / KINDERGELD) * 100);
  return (
    <TopicPage emoji="👛" title="Sparen vom Kindergeld" intro={`Deine Eltern bekommen ${KINDERGELD} € Kindergeld im Monat – bis du 18 bist, in Ausbildung oder Studium oft bis 25.`} next="/altersvorsorgedepot">
      <Box title="Die Idee in 3 Sätzen">
        <p>Ein fester Teil vom Kindergeld geht jeden Monat in einen Sparplan (z. B. ein ETF).</p>
        <p><b>Was du investierst:</b> der Betrag, den du einzahlst. <b>Was dazukommt:</b> die Rendite – also Gewinn, den dein Geld erwirtschaftet.</p>
        <p>Die <b>Sparquote</b> zeigt, welchen Anteil vom Kindergeld du sparst.</p>
      </Box>
      <section className="card-pop space-y-5 p-5">
        <h2 className="text-xl font-bold">Dein Kindergeld-Rechner</h2>
        <Slider label="Sparbetrag pro Monat" value={monthly} set={setMonthly} min={10} max={KINDERGELD} step={5} unit="€" />
        <Slider label="Erwartete Rendite pro Jahr" value={rate} set={setRate} min={0} max={10} step={0.5} unit="%" />
        <Slider label="Wie lange?" value={years} set={setYears} min={1} max={45} step={1} unit="Jahre" />
        <div className="rounded-xl bg-secondary p-4 text-center">
          <div className="text-sm">Deine Sparquote</div>
          <div className="text-3xl font-extrabold">{quote} %</div>
          <div className="text-sm text-muted-foreground">{eur(monthly)} von {eur(KINDERGELD)} Kindergeld</div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-muted p-3"><div className="text-xs text-muted-foreground">Du zahlst ein</div><div className="text-xl font-bold">{eur(last.paid)}</div></div>
          <div className="rounded-xl bg-highlight/40 p-3"><div className="text-xs">Rendite dazu</div><div className="text-xl font-bold">+{eur(gain)}</div></div>
          <div className="rounded-xl bg-accent p-3"><div className="text-xs">Am Ende</div><div className="text-xl font-bold">{eur(last.total)}</div></div>
        </div>
        <p className="text-sm text-muted-foreground">Die Rendite ist eine Annahme. Aktien-ETFs schwankten früher im Schnitt um 5–8 % pro Jahr – es gibt keine Garantie.</p>
      </section>
      <Box title="So geht's">
        <p>1. Betrag festlegen, der wirklich passt.</p>
        <p>2. Einen <b>Sparplan</b> einrichten – das Geld geht automatisch jeden Monat weg.</p>
        <p>3. Unter 18 brauchst du ein Junior-Depot, das deine Eltern mit eröffnen.</p>
      </Box>
    </TopicPage>
  );
}
