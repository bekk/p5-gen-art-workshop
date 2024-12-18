import P5 from "p5";

class Turtle {
  x: number;
  y: number;
  angle: number;
  constructor(x: number, y: number, angle: number) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
  forward(distance: number) {
    const x = this.x + distance * Math.cos(this.angle);
    const y = this.y + distance * Math.sin(this.angle);
    return new Turtle(x, y, this.angle);
  }
  left(angle: number) {
    return new Turtle(this.x, this.y, (this.angle + angle) % (2 * Math.PI));
  }
  right(angle: number) {
    return new Turtle(this.x, this.y, (this.angle - angle) % (2 * Math.PI));
  }
}

interface LineDrawer {
  line: (x1: number, y1: number, x2: number, y2: number) => void;
}

class TurtleDrawer {
  turtle: Turtle;
  stack: Turtle[];
  length: number;
  angle: number;
  constructor(
    private drawer: LineDrawer,
    {
      initialTurtle,
      length,
      angle,
    }: { initialTurtle?: Turtle; length?: number; angle?: number }
  ) {
    this.turtle = initialTurtle ?? new Turtle(0, 0, 0);
    this.stack = [];
    this.length = length ?? 10;
    this.angle = angle ?? 0;
  }

  forward() {
    const newTurtle = this.turtle.forward(this.length);
    this.drawer.line(this.turtle.x, this.turtle.y, newTurtle.x, newTurtle.y);
    this.turtle = newTurtle;
  }

  left() {
    this.turtle = this.turtle.left(this.angle);
  }

  right() {
    this.turtle = this.turtle.right(this.angle);
  }

  push() {
    this.stack.push(this.turtle);
  }

  pop() {
    this.turtle = this.stack.pop()!;
  }
}

interface LSystem {
  axiom: string;
  rules: { [key: string]: string };
}

function generate(system: LSystem, iterations: number): string {
  let prev = system.axiom;
  let result = prev;
  for (let i = 0; i < iterations; i++) {
    result = prev
      .split("")
      .map((char) => (char in system.rules ? system.rules[char] : char))
      .join("");
    prev = result;
  }
  return result;
}

export function lsystem(p5: P5) {
  const CANVAS = 500;
  const axiom = "X";
  const rules = {
    X: "F+[[X]-X]-F[-FX]+X",
    F: "FF",
  };
  const iterations = 7;
  const angle = p5.radians(25);
  const length = CANVAS / 2 ** (iterations + 1.5);

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.noLoop();
  };

  p5.draw = () => {
    p5.noLoop();

    p5.background("white");
    p5.colorMode(p5.HSB, 255, 255, 255, 1);
    p5.stroke(100, 120, 120, 0.25);
    p5.strokeWeight(1);
    p5.noFill();
    p5.translate(CANVAS / 2, CANVAS / 2);
    const turtleDrawer = new TurtleDrawer(p5, {
      initialTurtle: new Turtle(0, CANVAS / 2, -p5.PI / 2),
      length,
      angle,
    });
    const result = generate({ axiom, rules }, iterations);

    for (const char of result) {
      if (char === "F") {
        turtleDrawer.forward();
      } else if (char === "-") {
        turtleDrawer.left();
      } else if (char === "+") {
        turtleDrawer.right();
      } else if (char === "[") {
        turtleDrawer.push();
      } else if (char === "]") {
        turtleDrawer.pop();
      }
    }
  };
}

export function gosper(p5: P5) {
  const CANVAS = 500;
  const axiom = "A";
  const rules = {
    A: "A-B--B+A++AA+B-",
    B: "+A-BB--B-A++A+B",
  };
  const iterations = 4;
  const angle = p5.radians(60);
  //const length = CANVAS / 2 ** (iterations + 2);
  const length = (0.9 * CANVAS) / p5.sqrt(8) ** iterations;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  p5.setup = () => {
    p5.createCanvas(CANVAS, CANVAS);
    p5.noLoop();
  };

  p5.draw = () => {
    p5.noLoop();

    p5.background("white");
    p5.stroke("black");
    p5.strokeWeight(1);
    p5.noFill();
    p5.translate(CANVAS / 2, CANVAS / 2);
    const turtleDrawer = new TurtleDrawer(p5, {
      initialTurtle: new Turtle(0, -CANVAS / 2, 0),
      length,
      angle,
    });
    const result = generate({ axiom, rules }, iterations);

    for (const char of result) {
      if (char === "A" || char === "B") {
        turtleDrawer.forward();
      } else if (char === "-") {
        turtleDrawer.left();
      } else if (char === "+") {
        turtleDrawer.right();
      } else if (char === "[") {
        turtleDrawer.push();
      } else if (char === "]") {
        turtleDrawer.pop();
      }
      minX = Math.min(minX, turtleDrawer.turtle.x);
      maxX = Math.max(maxX, turtleDrawer.turtle.x);
      minY = Math.min(minY, turtleDrawer.turtle.y);
      maxY = Math.max(maxY, turtleDrawer.turtle.y);
    }
    console.log(
      `For n=${iterations}: x=${maxX - minX} (${maxX} - ${minX}), y=${
        maxY - minY
      } (${maxY} - ${minY})`
    );
  };
}
