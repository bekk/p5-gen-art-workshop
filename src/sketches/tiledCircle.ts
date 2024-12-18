import P5 from "p5";

export function tiledCircles(p5: P5) {
  const CANVAS = 500;
  const TILES = 50;
  const tileSize = CANVAS / TILES;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.noFill();
    p5.background("white");
    for (let row = 0; row < TILES; row++) {
      for (let col = 0; col < TILES; col++) {
        drawTile(row, col);
      }
    }
  };

  function drawTile(row: number, col: number) {
    const left = col * tileSize;
    const right = left + tileSize;
    const top = row * tileSize;
    const bottom = top + tileSize;
    if (p5.random() > 0.5) {
      drawQuarterCircle(left, bottom, 3);
      drawQuarterCircle(right, top, 1);
    } else {
      drawQuarterCircle(left, top, 0);
      drawQuarterCircle(right, bottom, 2);
    }
  }

  function drawQuarterCircle(x: number, y: number, quadrant: number) {
    p5.arc(
      x,
      y,
      tileSize,
      tileSize,
      p5.HALF_PI * quadrant,
      p5.HALF_PI * (quadrant + 1)
    );
  }
}
