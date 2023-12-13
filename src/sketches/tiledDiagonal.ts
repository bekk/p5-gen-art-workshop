import P5 from "p5";

export function tiledDiagonal(p5: P5) {
  const CANVAS = 800;
  const tiles = 20;
  const tileSize = CANVAS / tiles;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
  };

  p5.draw = () => {
    p5.noLoop();
    p5.background("white");
    p5.stroke("black");
    p5.strokeWeight(2);

    for (let row = 0; row < tiles; row++) {
      for (let column = 0; column < tiles; column++) {
        drawTile(row, column);
      }
    }
  };

  function drawTile(row: number, column: number) {
    const top = tileSize * row;
    const bottom = top + tileSize;
    const left = tileSize * column;
    const right = left + tileSize;
    if (p5.random() > 0.5) {
      p5.line(left, top, right, bottom);
    } else {
      p5.line(right, top, left, bottom);
    }
  }
}
