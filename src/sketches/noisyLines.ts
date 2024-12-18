import P5 from "p5";

// bruk denne fila som en mal på hvordan sketcher kan utformes!
// kopier fila, husk å endre navnet på både fila og funksjonen.
// oppdater også src/sketches/index.ts slik at den peker på den nye fila.
export function noisyLines(p5: P5) {
  // setup-funksjonen kjører én gang når siden lastes inn.
  const CANVAS = 500;
  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background("white");
  };

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  const colors = [
    p5.color("red"),
    p5.color("orange"),
    p5.color("yellow"),
    p5.color("green"),
    p5.color("blue"),
    p5.color("indigo"),
    p5.color("violet"),
  ];
  const lines = colors.length;
  const gapBetweenLines = CANVAS / lines;
  p5.draw = () => {
    p5.noLoop();
    p5.stroke("black");
    p5.translate(CANVAS / 2, CANVAS / 2);

    for (let i = 0; i < lines; i++) {
      const yBase = gapBetweenLines * (i + 1 / 2) - CANVAS / 2;
      let prevX = -CANVAS / 2;
      let prevY = yBase;
      const lineSegments = 500;
      const segmentLength = CANVAS / lineSegments;
      for (let j = 0; j < lineSegments; j++) {
        const newX = prevX + segmentLength;
        const newY =
          yBase + p5.random(-(prevX - yBase) / 10, (prevX - yBase) / 10);
        p5.strokeWeight(1);
        p5.stroke(colors[i]);
        p5.line(prevX, prevY, newX, newY);
        prevX = newX;
        prevY = newY;
      }
    }
  };
}
