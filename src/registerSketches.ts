import P5 from "p5";
import { snowflake } from "./sketches/snowflake";
import { tiledDiagonal } from "./sketches/tiledDiagonal";
import { quarterCircles } from "./sketches/quarterCircles";
import { spinningCircle } from "./sketches/spinningCircle";

export type SketchClosure = (p: P5) => void;

export const sketches: Record<string, SketchClosure> = {
  "Snurrende sirkel": spinningCircle,
  "Flislagte diagonaler": tiledDiagonal,
  Kvartsirkler: quarterCircles,
  Snøfnugg: snowflake,
};
