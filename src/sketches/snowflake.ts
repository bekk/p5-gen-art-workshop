import P5 from "p5";

// uff, for et sykt kjedelig snøfnugg!
export function snowflake(p5: P5) {
  const CANVAS = 800;
  const snowflakeSize = 0.8;
  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
  };

  p5.draw = () => {
    p5.noLoop();
    p5.background("midnightblue");
    // forskyver koodinatsystemet slik at (0, 0) er midten av lerretet
    p5.translate(CANVAS / 2, CANVAS / 2);
    for (let i = 0; i < 6; i++) {
      p5.stroke("white");
      p5.strokeWeight(3);
      // tegner en linje fra midten og nedover
      p5.line(0, 0, 0, (CANVAS * snowflakeSize) / 2);
      // rotér koordinatsystemet en sjettedel av en sirkel
      // da kan vi fortsette å tegne fra midten og nedover
      p5.rotate(p5.TWO_PI / 6);
    }
  };
}
