# Artgenosse Videos

<http://artgenosse.netlify.app>

Diese Seite hilft dabei, schnell Videos vom [Artgenossen](https://www.youtube.com/c/DerArtgenosse) anhand von Stichwörtern zu finden.

Das geht in der Regel schneller als YouTube zu öffnen, den Artgenossen zu suchen und dann auf dem Kanal nach dem richtigen Video zu suchen (zumal die mobile YouTube App nicht einmal die gezielte Suche nach Videos auf einem Kanal unterstützt).

## Zum Repository

Diese Anwendung wurde mit [SvelteKit](https://svelte.dev) programmiert. Zur Installation der Abhängigkeiten: `pnpm install`

Die Liste der Videos wird mit einem Skript aktualisiert, welches mit

`pnpm update:videos`

bei Bedarf ausgeführt wird. Das reicht aus, weil im Falle des Artgenossen relativ selten neue Videos erscheinen.

Das Skript fragt die [YouTube Data API](https://developers.google.com/youtube/v3/docs) an und schreibt die Videos in eine statische JSON-Datei (`videos.json`), welche dann die Seite befüllt. Das bedeutet: zur Laufzeit der Anwendung werden keine API-Abfragen gemacht. Die Videos können auf der Seite dann anhand von Titel und Beschreibung durchsucht werden.
