export function mySketch(p5) {
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  // innholdet i setup() kjøres én gang, når sketchen starter
  p5.setup = () => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    p5.background("white");
  };

  // innholdet i draw() kjøres kontinuerlig, etter setup()
  p5.draw = () => {
    p5.background("white");
    p5.fill("black");
    p5.ellipse(p5.mouseX, p5.mouseY, 10, 10);
  };
}
