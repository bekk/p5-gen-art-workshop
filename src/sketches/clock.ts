import P5 from "p5";

export function clock(p5: P5) {
  const CANVAS = 500;
  let timeInSeconds = 0;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    timeInSeconds = 0;
  };

  p5.draw = () => {
    timeInSeconds += p5.deltaTime / 1_000;
    p5.background("black");
    p5.stroke("white");
    p5.strokeWeight(3);
    p5.translate(CANVAS / 2, CANVAS / 2);
    p5.push();
    p5.rotate(((timeInSeconds % 60) * p5.TWO_PI) / 60);
    p5.line(0, 0, 0, (-0.9 * CANVAS) / 2);
    p5.pop();
    p5.rotate(((timeInSeconds % 3600) * p5.TWO_PI) / 3600);
    p5.line(0, 0, 0, -CANVAS / 3);
  };
}
