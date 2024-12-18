import P5 from "p5";

document.body.addEventListener("click", (e) => {
  makeDot(e.clientX, e.clientY);
});

// bruk denne fila som en mal på hvordan sketcher kan utformes!
// kopier fila, husk å endre navnet på både fila og funksjonen.
// oppdater også src/registerSketches.ts slik at den peker på den nye fila.
export function bezier(p5: P5) {
  // setup-funksjonen kjører én gang når siden lastes inn.
  p5.setup = () => {
    p5.createCanvas(400, 400);
  };

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  p5.draw = () => {
    p5.background(220);
    const minX = 100;
    const minY = 100;
    const maxX = p5.width - 100;
    const maxY = p5.height - 100;
    const f = makeNormalizedCubicBezier(0, 1, 0, 1);
    p5.noFill();
    p5.stroke(180);
    p5.rect(minX, minY, maxX - minX, maxY - minY);
    p5.stroke(0);
    for (let t = 0; t < 1000; t++) {
      const p = f(t / 1000);
      const x = lerp(minX, maxX, p.x);
      const y = p5.height - lerp(minY, maxY, p.y);
      p5.point(x, y);
    }
  };
}
function normalize(a: number, b: number, x: number): number {
  return (x - a) / (b - a);
}
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}
function makeCubicBezier(p0: Point, p1: Point, p2: Point, p3: Point) {
  return (t: number) => {
    const p01 = lerpPoint(p0, p1, t);
    const p12 = lerpPoint(p1, p2, t);
    const p23 = lerpPoint(p2, p3, t);
    const p012 = lerpPoint(p01, p12, t);
    const p123 = lerpPoint(p12, p23, t);
    return lerpPoint(p012, p123, t);
  };
}
function makeNormalizedCubicBezier(a: number, b: number, c: number, d: number) {
  return makeCubicBezier(
    { x: 0, y: 0 },
    { x: a, y: b },
    { x: c, y: d },
    { x: 1, y: 1 }
  );
}

type Point = { x: number; y: number };

function makeDot(x: number, y: number) {
  const dot = getOrCreateDot();
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  dot.animate([{ transform: "" }, { transform: "translate(200px, -200px)" }], {
    easing: "cubic-bezier(0, 1, 0, 1)",
    duration: 1000,
  });
}

function getOrCreateDot() {
  const dotId = "dot";
  const existingDot = document.getElementById(dotId);
  if (existingDot) {
    return existingDot;
  }
  const dot = document.createElement("div");
  dot.id = dotId;
  dot.style.width = "10px";
  dot.style.height = "10px";
  dot.style.backgroundColor = "red";
  dot.style.borderRadius = "50%";
  dot.style.position = "absolute";
  document.body.appendChild(dot);
  return dot;
}
