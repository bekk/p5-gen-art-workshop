import P5 from "p5";
import { snowflake } from "./sketches/snowflake";
import { tiledDiagonal } from "./sketches/tiledDiagonal";
import { quarterCircles } from "./sketches/quarterCircles";
import { spinningCircle } from "./sketches/spinningCircle";
import { lsystem } from "./sketches/l-systems";
import { marchingSquares } from "./sketches/marchingSquares";
import { perlinLine } from "./sketches/perlinLine";
import { bezier } from "./sketches/bezier";

export type SketchClosure = (p: P5) => void;

export const sketches: Record<string, SketchClosure> = {
  "Snurrende sirkel": spinningCircle,
  "Flislagte diagonaler": tiledDiagonal,
  Kvartsirkler: quarterCircles,
  Snøfnugg: snowflake,
  "L-systemer": lsystem,
  "Marching squares": marchingSquares,
  Perlin: perlinLine,
  Bezier: bezier,
};
