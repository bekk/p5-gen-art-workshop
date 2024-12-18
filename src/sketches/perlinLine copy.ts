import P5 from "p5";

export function perlineLine2(p5: P5) {
  // setup-funksjonen kjører én gang når siden lastes inn.
  const CANVAS = 800;
  const segments = 1000;
  const segmentLength = CANVAS / segments;
  const noiseFrequency = 0.01;
  const maxAmplitude = 200;
  let time = 0;
  const timeFactor = 0.5;
  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background("black");
  };

  // draw-funksjonen kjører kontinuerlig etter setup.
  // hvis du ikke vil at draw skal kjøre kontinuerlig,
  // kan du kalle p5.noLoop() i enten setup eller draw.
  let prevX = 0;
  let prevY = getY(0);
  const stepsPerFrame = 20;
  p5.draw = () => {
    p5.colorMode(p5.HSB, 255, 100, 100, 1);
    p5.stroke((time * 10) % 255, 100, 100, 0.2);
    p5.strokeWeight(1);
    p5.translate(0, CANVAS / 2);
    for (let i = 0; i < stepsPerFrame; i++) {
      const newX = prevX + segmentLength;
      const newY = getY(newX);
      p5.line(prevX, prevY, newX, newY);
      prevX = newX;
      prevY = newY;
    }
    if (prevX > CANVAS) {
      time += 0.05;
      prevX = 0;
      prevY = getY(0);
    }
  };

  function getY(x: number) {
    const noise = p5.noise(x * noiseFrequency, time * timeFactor);
    const amplitude = p5.map(x, 0, CANVAS, 10, maxAmplitude);
    return p5.map(noise, 0, 1, -amplitude, amplitude);
  }
}
