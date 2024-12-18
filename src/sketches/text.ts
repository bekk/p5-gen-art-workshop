import P5 from "p5";

// bruk denne fila som en mal på hvordan sketcher kan utformes!
// kopier fila, husk å endre navnet på både fila og funksjonen.
// oppdater også src/sketches/index.ts slik at den peker på den nye fila.
interface Point {
  start: P5.Vector;
  pos: P5.Vector;
  velocity: P5.Vector;
  angle: P5.Vector;
}

export function text(p5: P5) {
  let font: P5.Font;
  p5.preload = () => {
    font = p5.loadFont("src/sketches/assets/Roboto-Regular.ttf");
  };

  const CANVAS = 500;
  let points: Point[];
  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    points = font.textToPoints("Hallo!", 20, 300, 192).map((p) => ({
      start: p5.createVector(p.x, p.y),
      pos: p5.createVector(p.x, p.y),
      velocity: p5.createVector(0, 0),
      angle: p5.createVector(
        p5.cos(p5.radians(p.alpha)),
        p5.sin(p5.radians(p.alpha))
      ),
    }));
  };

  p5.draw = () => {
    p5.background("white");
    p5.stroke(0);
    p5.strokeWeight(2);

    const cursorForceConstant = 2000;
    const springForceConstant = 0.05;

    for (const point of points) {
      const { x, y } = point.pos;
      const cursorForce = p5.createVector(x - p5.mouseX, y - p5.mouseY);
      const cursorDistance = cursorForce.mag();
      cursorForce.normalize().mult(cursorForceConstant / cursorDistance ** 2);
      const springForce = p5.createVector(point.start.x - x, point.start.y - y);
      const force = cursorForce.add(springForce).mult(springForceConstant);
      point.velocity.add(force);
      point.velocity.mult(0.9);
      point.pos.add(point.velocity);
      p5.point(point.pos.x, point.pos.y);
      p5.line(
        point.pos.x,
        point.pos.y,
        point.pos.x + point.angle.x * 5,
        point.pos.y + point.angle.y * 5
      );
    }
  };
}
