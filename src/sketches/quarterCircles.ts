import P5 from "p5";

// Kan du lage en "flislagt" versjon av denne?
// Hent inspirasjon fra tiledDiagonal.ts!
export function quarterCircles(p5: P5) {
  const CANVAS = 800;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.background("white");
  };

  p5.draw = () => {
    p5.noLoop();
    p5.noFill();

    const left = 0;
    const right = CANVAS;
    const top = 0;
    const bottom = CANVAS;
    if (p5.random() > 0.5) {
      drawQuarterCircle(left, bottom, CANVAS / 2, p5.PI + p5.HALF_PI);
      drawQuarterCircle(right, top, CANVAS / 2, p5.HALF_PI);
    } else {
      drawQuarterCircle(left, top, CANVAS / 2, 0);
      drawQuarterCircle(right, bottom, CANVAS / 2, p5.PI);
    }
  };

  function drawQuarterCircle(
    circleCenterX: number,
    circleCenterY: number,
    circleRadius: number,
    startAngle: number
  ) {
    p5.arc(
      circleCenterX,
      circleCenterY,
      circleRadius * 2,
      circleRadius * 2,
      startAngle,
      startAngle + p5.HALF_PI
    );
  }
}
