import P5 from "p5";

export function noiseExample(p5: P5) {
  const CANVAS = 500;
  const backgroundColor = p5.color(35, 39, 46);
  const fooColor = p5.color(44, 49, 60);
  const grey = p5.color(171, 178, 191);
  const blue = p5.color(95, 170, 232);
  const numberOfSections = 100;
  const sectionLength = CANVAS / numberOfSections;
  const amplitude = 100;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background(backgroundColor);
  };

  p5.draw = () => {
    p5.noLoop();
    p5.translate(0, CANVAS / 2); // flytter slik at y=0 er midt på lerretet

    let previousX = 0;
    let previousY = 0;
    p5.stroke(grey);
    p5.strokeWeight(1);
    p5.line(0, -amplitude, CANVAS, -amplitude);
    p5.line(0, amplitude, CANVAS, amplitude);
    p5.strokeWeight(2);
    p5.stroke(fooColor);
    p5.line(0, 0, CANVAS, 0);
    p5.stroke(blue);
    for (let i = 0; i < numberOfSections; i++) {
      const newX = previousX + sectionLength;
      const noise = p5.noise(newX * 0.05);
      const newY = p5.map(noise, 0, 1, -amplitude, amplitude);
      p5.line(previousX, previousY, newX, newY);
      previousX = newX;
      previousY = newY;
    }
  };
}
