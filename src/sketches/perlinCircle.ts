import P5 from "p5";

const CANVAS = 500;
const STEPS = 1_000;
const circleDiameter = 0.6;
const noiseScale = 0.5;
const noiseFrequency = 3;
const timescale = 0.005;
let t = 0;

interface Point {
  x: number;
  y: number;
}

export function perlinCircle(p5: P5) {
  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background("white");
  };
  p5.draw = () => {
    t += timescale;
    p5.stroke(0, 2);
    p5.translate(CANVAS / 2, CANVAS / 2);

    let prevCoords = getCoordinates(0);
    for (let i = 1; i <= STEPS; i++) {
      const angle = getAngle(i);
      const coords = getCoordinates(angle);
      p5.line(prevCoords.x, prevCoords.y, coords.x, coords.y);
      prevCoords = coords;
    }
  };

  function getAngle(step: number) {
    return (step * p5.TWO_PI) / STEPS;
  }

  function getCoordinates(angle: number): Point {
    const noise =
      noiseScale *
      p5.noise(
        (p5.cos(angle) + 1) * noiseFrequency,
        (p5.sin(angle) + 1) * noiseFrequency,
        t
      );
    const scaling =
      ((1 - t / 10) *
        (CANVAS * circleDiameter * (1 + noiseScale / 2 + noise))) /
      2;
    return {
      x: scaling * p5.cos(angle),
      y: scaling * p5.sin(angle),
    };
  }
}
