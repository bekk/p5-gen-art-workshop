import P5 from "p5";

// bruk denne fila som en mal på hvordan sketcher kan utformes!
// kopier fila, husk å endre navnet på både fila og funksjonen.
// oppdater også src/sketches/index.ts slik at den peker på den nye fila.
export function flowField(p5: P5) {
  // setup-funksjonen kjører én gang når siden lastes inn.
  const CANVAS = 400;
  const noiseFrequency = 0.005;
  const particleCount = 2000;
  const velocity = 2;
  const particles = Array.from({ length: particleCount }, () => ({
    x: p5.random(CANVAS),
    y: p5.random(CANVAS),
  }));

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
  };

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  p5.draw = () => {
    p5.background(255, 25);
    for (const particle of particles) {
      const { x, y } = particle;
      const noise = p5.noise(x * noiseFrequency, y * noiseFrequency);
      const direction = p5.map(noise, 0, 1, 0, p5.TWO_PI);
      particle.x += velocity * p5.cos(direction);
      particle.y += velocity * p5.sin(direction);
      if (
        particle.x < 0 ||
        particle.x > CANVAS ||
        particle.y < 0 ||
        particle.y > CANVAS
      ) {
        particle.x = p5.random(CANVAS);
        particle.y = p5.random(CANVAS);
      }
      p5.circle(particle.x, particle.y, 1);
    }
  };
}
