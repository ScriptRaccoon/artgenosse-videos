# Artgenosse Videosuche

👉 <http://artgenosse.netlify.app>

Diese Seite hilft dabei, schnell das richtige Video vom [Artgenossen](https://www.youtube.com/c/DerArtgenosse) für eine Person zu finden, die lieber Omni-Bingo spielt statt sachlich zu diskutieren.

## Zum Repository

Diese Anwendung wurde mit [SvelteKit](https://svelte.dev) programmiert. Zur Installation der Abhängigkeiten:

`pnpm install`

Die Liste der Videos wird bei Bedarf mit einem Skript aktualisiert, welches mit

`pnpm update:videos`

ausgeführt wird. Es gibt hierbei keine automatisierte, zeitbasierte Ausführung, was ausreicht, weil im Falle des Artgenossen relativ selten neue Videos erscheinen.

Das Skript fragt die [YouTube Data API](https://developers.google.com/youtube/v3/docs) an und schreibt die Videos in eine statische JSON-Datei (`videos.json`), welche dann die Seite befüllt. Das bedeutet: zur Laufzeit der Anwendung werden keine API-Abfragen gemacht. Die Videos können auf der Seite dann anhand von Titel und Beschreibung durchsucht werden.

Für das Skript muss ein API-Schlüssel als Umgebungsvariable gesetzt sein (`.env`).

Der Code kann problemlos auf andere YouTube-Kanäle angepasst werden: dazu einfach die `CHANNEL_ID` im Update-Skript (`update.ts`) anpassen.