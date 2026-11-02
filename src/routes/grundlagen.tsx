import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, Box } from "@/components/TopicPage";

export const Route = createFileRoute("/grundlagen")({
  head: () => ({ meta: [
    { title: "Grundlagen der Geldanlage – Geldstart" },
    { name: "description", content: "Was ist Geldanlage? Sparen, Inflation, Risiko – einfach erklärt." },
    { property: "og:title", content: "Grundlagen der Geldanlage" },
    { property: "og:description", content: "Sparen, Inflation und Risiko einfach erklärt." },
  ] }),
  component: () => (
    <TopicPage emoji="💡" title="Grundlagen" intro="Geld anlegen heißt: Du legst Geld zur Seite, damit es mehr wird." next="/zinseszins">
      <Box title="Sparen oder anlegen?">
        <p><b>Sparen</b> = Geld zur Seite legen, z. B. auf dem Konto.</p>
        <p><b>Anlegen</b> = Geld so einsetzen, dass es wächst – z. B. mit Zinsen oder Aktien.</p>
      </Box>
      <Box title="Warum nicht nur unters Kopfkissen?">
        <p>Die Preise steigen mit der Zeit. Das nennt man <b>Inflation</b>.</p>
        <p>Beispiel: Steigen die Preise um 2 % im Jahr, kannst du dir mit 100 € in 10 Jahren nur noch so viel kaufen wie heute mit etwa 82 €.</p>
      </Box>
      <Box title="Die 3 goldenen Regeln">
        <p>1. <b>Früh anfangen</b> – Zeit ist dein größter Vorteil.</p>
        <p>2. <b>Streuen</b> – nicht alles auf eine Karte setzen.</p>
        <p>3. <b>Notgroschen zuerst</b> – etwas Geld schnell verfügbar halten.</p>
      </Box>
      <Box tone="warn" title="Risiko und Rendite">
        <p>Mehr Chance auf Gewinn heißt meistens auch mehr Risiko. Geld, das du bald brauchst, gehört nicht in Aktien.</p>
      </Box>
    </TopicPage>
  ),
});
