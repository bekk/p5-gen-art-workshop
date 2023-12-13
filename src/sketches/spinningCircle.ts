import P5 from "p5";

export function spinningCircle(p5: P5) {
  const CANVAS = 500;
  let timeInSeconds = 0;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background("white");
  };

  p5.draw = () => {
    timeInSeconds += p5.deltaTime / 1_000;
    p5.background(255, 20);

    p5.translate(CANVAS / 2, CANVAS / 2);
    p5.rotate(timeInSeconds);

    p5.fill("black");
    p5.circle(0, 200, 30);
  };
}
