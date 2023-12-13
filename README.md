## Ser du etter slides?

De ligger i mappa [slides](slides/).

## Installasjon og oppsett

Installer det du trenger ved å kjøre

```bash
yarn install
# eller
npm install
```

Kjør igang prosjektet ved å kjøre

```bash
yarn dev
# eller
npm run dev
```

Prosjektet skal da kjøre i gang en port på localhost, og du kan se resultatet i nettleseren.
Standard port er [http://localhost:5173](http://localhost:5173).

## Opprette en sketch

Du kan lage en ny sketch ved å opprette en fil i mappa [src/sketches](src/sketches/).

For å kunne velge den i visningen i nettleseren, må du også registrere sketchen din ved å legge den til i [src/sketches/index.ts](src/sketches/index.ts):

```typescript
// andre imports...
import { mySketch } from "./mySketch";

export const sketches: Record<string, SketchClosure> = {
  // ... det som ligger der fra før
  "Min kule sketch": mySketch,
};
```

### Mal for TypeScript

For TypeScript-brukere, kan du kopiere fila [src/sketches/\_template.ts](src/sketches/_template.ts) og oppdatere den med ditt eget navn og innhold, eller bare kopiere malen som ligger under under.

<details>
<summary>Mal for TypeScript-sketcher</summary>

```typescript
import P5 from "p5";

// bruk denne fila som en mal på hvordan sketcher kan utformes!
// kopier fila, husk å endre navnet på både fila og funksjonen.
// oppdater også src/sketches/index.ts slik at den peker på den nye fila.
export function sketchTemplate(p5: P5) {
  // setup-funksjonen kjører én gang når siden lastes inn.
  p5.setup = () => {
    p5.createCanvas(400, 400);
  };

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  p5.draw = () => {
    p5.background(220);
  };
}
```

</details>

### Mal for JavaScript

For JavaScript-brukere er det [src/sketches/\_template.js](src/sketches/_template.js) som gjelder

<details>
<summary>Mal for JavaScript-sketcher</summary>

```javascript
// bruk denne fila som en mal på hvordan sketcher kan utformes!
// kopier fila, husk å endre navnet på både fila og funksjonen.
// oppdater også src/sketches/index.ts slik at den peker på den nye fila.
export function mySketch(p5) {
  // setup-funksjonen kjører én gang når siden lastes inn.

  p5.setup = () => {};

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  p5.draw = () => {};
}
```

</details>

## Hva skal jeg gjøre?

Slipp kreativiteten helt løs, og gjør akkurat hva du vil!

Du kan jo piffe opp de eksiterende sketchene litt:

- [snowflake.ts](src/sketches/snowflake.ts) prøver å lage et snøfnugg, men har ikke kommet seg så langt av gårde
- [quarterCircles.ts](src/sketches/quarterCircles.ts) har laget kvartsirkler i hjørnene, men trenger hjelp med å bli flislagt
- [spinningCircle.ts](src/sketches/spinningCircle.ts) har en snurrende sirkel, men den er litt kjedelig. Kan du gjøre den mer spennende?

Du kan også finne gode eksempler på hva som er mulig på [p5.js sin eksempelsamling](https://p5js.org/examples/).

Eller, hvis du er litt mer nerdete anlagt kan du lese [dokumentasjonen direkte](https://p5js.org/reference/).
