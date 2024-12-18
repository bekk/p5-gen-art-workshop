import P5 from "p5";

type BraidMode = "straight" | "over" | "under";

export function braids(p5: P5) {
  const CANVAS = 800;
  const NUM_STRANDS = 30;
  const NUM_ROWS = 30;
  const BRAID_WIDTH = 15;
  const BACKGROUND = "black";

  const sectionHeight = CANVAS / NUM_ROWS;
  const gapBetween = CANVAS / NUM_STRANDS - BRAID_WIDTH;

  let colors: string[] = [];
  let nextColors: string[] = [];

  if (BRAID_WIDTH * NUM_STRANDS > CANVAS) {
    throw new Error("Braid width too large");
  }

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    const availableColors = ["tomato", "gold", "limegreen", "dodgerblue"];
    colors = Array.from(
      { length: NUM_STRANDS },
      (_, i) => availableColors[i % availableColors.length]
    );
    colors = p5.shuffle(colors);

    nextColors = Array(NUM_STRANDS);
  };

  p5.draw = () => {
    p5.noLoop();
    p5.background(BACKGROUND);

    for (let row = 0; row < NUM_ROWS; row++) {
      let strand = 0;
      while (strand < NUM_STRANDS) {
        const mode =
          NUM_STRANDS - strand === 1
            ? "straight"
            : (p5.random(["straight", "over", "under"]) as BraidMode);

        if (mode === "straight") {
          drawStraight(strand, row);
          strand++;
        } else if (mode === "over") {
          drawLeft(strand + 1, row);
          drawRight(strand, row);
          strand += 2;
        } else if (mode === "under") {
          drawRight(strand, row);
          drawLeft(strand + 1, row);
          strand += 2;
        }
      }

      colors = [...nextColors];
    }
  };

  function drawStraight(strand: number, row: number) {
    drawStrand(strand, strand, row);
  }

  function drawStrand(fromStrand: number, toStrand: number, row: number) {
    const fromX = strandCenterX(fromStrand);
    const toX = strandCenterX(toStrand);
    const top = row * sectionHeight;
    const bottom = top + sectionHeight;

    p5.noFill();
    p5.stroke(BACKGROUND);
    p5.strokeWeight(BRAID_WIDTH / 2 + 2);
    p5.bezier(
      fromX,
      top + 2,
      fromX,
      p5.lerp(top, bottom, 0.6),
      toX,
      p5.lerp(top, bottom, 0.4),
      toX,
      bottom - 2
    );

    const color = colors[fromStrand];
    nextColors[toStrand] = color;
    p5.stroke(color);
    p5.strokeWeight(BRAID_WIDTH / 2);
    p5.bezier(
      fromX,
      top,
      fromX,
      p5.lerp(top, bottom, 0.6),
      toX,
      p5.lerp(top, bottom, 0.4),
      toX,
      bottom
    );
  }

  function drawLeft(strand: number, row: number) {
    drawStrand(strand, strand - 1, row);
  }

  function drawRight(strand: number, row: number) {
    drawStrand(strand, strand + 1, row);
  }

  function strandCenterX(strand: number): number {
    return (gapBetween + BRAID_WIDTH) * (strand + 1 / 2);
  }
}
