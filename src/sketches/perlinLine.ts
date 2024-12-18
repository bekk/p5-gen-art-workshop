import P5 from "p5";

export function perlinLine(p5: P5) {
  // setup-funksjonen kjører én gang når siden lastes inn.
  const CANVAS = 800;
  const segments = 1000;
  const segmentLength = CANVAS / segments;
  const noiseFrequency = 0.01;
  const maxAmplitude = 200;
  let timeInSeconds = 0;
  const timeFactor = 0.5;
  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background("black");
  };

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  p5.draw = () => {
    timeInSeconds += p5.deltaTime / 1000;

    p5.colorMode(p5.HSB, 255, 100, 100, 1);
    p5.stroke((timeInSeconds * 10) % 255, 100, 100, 0.05);
    p5.strokeWeight(1);
    p5.translate(0, CANVAS / 2);
    let prevX = 0;
    let prevY = getY(0);
    for (let i = 0; i < segments; i++) {
      const newX = prevX + segmentLength;
      const newY = getY(newX);
      p5.line(prevX, prevY, newX, newY);
      prevX = newX;
      prevY = newY;
    }
  };

  function getY(x: number) {
    const noise = p5.noise(x * noiseFrequency, timeInSeconds * timeFactor);
    const amplitude = p5.map(x, 0, CANVAS, 10, maxAmplitude);
    return p5.map(noise, 0, 1, -amplitude, amplitude);
  }
}
