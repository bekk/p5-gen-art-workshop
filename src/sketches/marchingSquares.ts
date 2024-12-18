import P5 from "p5";

export function marchingSquares(p5: P5) {
  const CANVAS = 800;
  const tiles = 10;
  const tileSize = CANVAS / tiles;
  const noiseFrequency = 0.1;
  const threshold = 0.5;
  let timeInSeconds = 0;
  const underColor = p5.color(49, 64, 86);
  const overColor = p5.color(241, 217, 179);

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
  };

  p5.draw = () => {
    timeInSeconds += p5.deltaTime / 1000;
    p5.noLoop();

    p5.background(underColor);

    for (let row = 0; row < tiles; row++) {
      for (let column = 0; column < tiles; column++) {
        drawTile(row, column);
      }
    }
  };

  function drawTile(row: number, column: number) {
    const rect = new Rectangle(
      tileSize * column,
      tileSize * row,
      tileSize,
      tileSize
    );
    const topLeft =
      p5.noise(noiseFrequency * rect.left, noiseFrequency * rect.top) >
      threshold;
    const topRight =
      p5.noise(noiseFrequency * rect.right, noiseFrequency * rect.top) >
      threshold;
    const bottomLeft =
      p5.noise(noiseFrequency * rect.left, noiseFrequency * rect.bottom) >
      threshold;
    const bottomRight =
      p5.noise(noiseFrequency * rect.right, noiseFrequency * rect.bottom) >
      threshold;

    //p5.noStroke();
    //p5.fill(overColor);

    p5.stroke(overColor);
    p5.noFill();

    if (topLeft && topRight && bottomLeft && bottomRight) {
      drawRect(rect);
    }
    if (topLeft && topRight && bottomLeft && !bottomRight) {
      drawRect(rect);
      p5.fill(underColor);
      drawBottomRight(rect);
      p5.fill(overColor);
    }
    if (topLeft && topRight && !bottomLeft && bottomRight) {
      drawRect(rect);
      p5.fill(underColor);
      drawBottomLeft(rect);
      p5.fill(overColor);
    }
    if (topLeft && topRight && !bottomLeft && !bottomRight) {
      p5.rect(rect.left, rect.top, tileSize, tileSize / 2);
    }
    if (topLeft && !topRight && bottomLeft && bottomRight) {
      drawRect(rect);
      p5.fill(underColor);
      drawTopRight(rect);
      p5.fill(overColor);
    }
    if (topLeft && !topRight && bottomLeft && !bottomRight) {
      p5.rect(rect.left, rect.top, tileSize / 2, tileSize);
    }
    if (topLeft && !topRight && !bottomLeft && bottomRight) {
      const center =
        p5.noise(noiseFrequency * rect.centerX, noiseFrequency * rect.centerY) >
        threshold;
      if (center) {
        drawRect(rect);
        p5.fill(underColor);
        drawBottomLeft(rect);
        drawTopRight(rect);
        p5.fill(overColor);
      } else {
        drawTopLeft(rect);
        drawBottomRight(rect);
      }
    }
    if (topLeft && !topRight && !bottomLeft && !bottomRight) {
      drawTopLeft(rect);
    }
    if (!topLeft && topRight && bottomLeft && bottomRight) {
      drawRect(rect);
      p5.fill(underColor);
      drawTopLeft(rect);
      p5.fill(overColor);
    }
    if (!topLeft && topRight && bottomLeft && !bottomRight) {
      const center =
        p5.noise(noiseFrequency * rect.centerX, noiseFrequency * rect.centerY) >
        threshold;
      if (center) {
        drawRect(rect);
        p5.fill(underColor);
        drawBottomRight(rect);
        drawTopLeft(rect);
        p5.fill(overColor);
      } else {
        drawTopRight(rect);
        drawBottomLeft(rect);
      }
    }
    if (!topLeft && topRight && !bottomLeft && bottomRight) {
      p5.rect(rect.centerX, rect.top, tileSize / 2, tileSize);
    }
    if (!topLeft && topRight && !bottomLeft && !bottomRight) {
      drawTopRight(rect);
    }
    if (!topLeft && !topRight && bottomLeft && bottomRight) {
      p5.rect(rect.left, rect.centerY, tileSize, tileSize / 2);
    }
    if (!topLeft && !topRight && bottomLeft && !bottomRight) {
      drawBottomLeft(rect);
    }
    if (!topLeft && !topRight && !bottomLeft && bottomRight) {
      drawBottomRight(rect);
    }
    if (!topLeft && !topRight && !bottomLeft && !bottomRight) {
    }
  }

  function quarterCircle(
    x: number,
    y: number,
    radius: number,
    startAngle: number
  ) {
    p5.arc(x, y, radius * 2, radius * 2, startAngle, startAngle + p5.HALF_PI);
  }

  function drawRect(rect: Rectangle) {
    p5.rect(rect.left, rect.top, rect.width, rect.height);
  }

  function drawTopLeft(rect: Rectangle) {
    quarterCircle(rect.left, rect.top, rect.width / 2, 0);
  }

  function drawTopRight(rect: Rectangle) {
    quarterCircle(rect.right, rect.top, rect.width / 2, p5.HALF_PI);
  }

  function drawBottomLeft(rect: Rectangle) {
    quarterCircle(rect.left, rect.bottom, rect.width / 2, p5.PI + p5.HALF_PI);
  }

  function drawBottomRight(rect: Rectangle) {
    quarterCircle(rect.right, rect.bottom, rect.width / 2, p5.PI);
  }
}

class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }
}
