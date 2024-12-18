import P5 from "p5";

export function nestedSquares(p5: P5) {
  const CANVAS = 500;
  const colorFrom = p5.color("gold");
  const colorTo = p5.color("red");
  const innerColor = p5.color("white");
  let timeInSeconds = 0;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background("white");
  };

  const repeats = 20;
  p5.draw = () => {
    p5.background("white");
    timeInSeconds += p5.deltaTime / 1000;
    const angle = (timeInSeconds / 10) % p5.HALF_PI;
    let size = CANVAS * 0.9;
    p5.translate(CANVAS / 2, CANVAS / 2);
    p5.rectMode(p5.CENTER);
    for (let i = 0; i < repeats - 1; i++) {
      p5.fill(p5.lerpColor(colorFrom, colorTo, size / CANVAS));
      p5.square(0, 0, size);
      p5.rotate(angle);
      size /= p5.sin(angle) + p5.cos(angle);
    }
    p5.fill(innerColor);
    p5.square(0, 0, size);
  };
}
