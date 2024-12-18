import P5 from "p5";

// bruk denne fila som en mal på hvordan sketcher kan utformes!
// kopier fila, husk å endre navnet på både fila og funksjonen.
// oppdater også src/sketches/index.ts slik at den peker på den nye fila.
export function image(p5: P5) {
  let image: P5.Image;
  const CANVAS = 500;

  p5.preload = () => {
    image = p5.loadImage("src/sketches/assets/the-scream.jpg");
  };

  // setup-funksjonen kjører én gang når siden lastes inn.
  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
  };

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  const particlesPerFrame = 100;
  const stepsPerParticle = 100;
  const stepLength = 5;
  let t = 0;
  p5.draw = () => {
    t += 0.01;
    for (let i = 0; i < particlesPerFrame; i++) {
      let x = p5.random(CANVAS);
      let y = p5.random(CANVAS);
      const backwards = p5.random() < 0.5;
      for (let j = 0; j < stepsPerParticle; j++) {
        const noise = p5.noise(x / 100, y / 100, t);
        const angle = noise * p5.TWO_PI + (backwards ? p5.PI : 0);
        const newX = x + p5.cos(angle) * stepLength;
        const newY = y + p5.sin(angle) * stepLength;
        const color = image.get(x, y);

        p5.stroke("black");
        p5.strokeWeight(3);
        p5.strokeCap(p5.SQUARE);
        p5.line(x, y, newX, newY);
        p5.strokeCap(p5.PROJECT);
        p5.stroke(color);
        p5.strokeWeight(2);
        p5.line(x, y, newX, newY);
        x = newX;
        y = newY;
      }
    }
  };
}
