import P5 from "p5";
import { snowflake } from "./snowflake";
import { tiledDiagonal } from "./tiledDiagonal";
import { quarterCircles } from "./quarterCircles";
import { spinningCircle } from "./spinningCircle";

export type SketchClosure = (p: P5) => void;

export const sketches: Record<string, SketchClosure> = {
  "Snurrende sirkel": spinningCircle,
  "Flislagte diagonaler": tiledDiagonal,
  Kvartsirkler: quarterCircles,
  Snøfnugg: snowflake,
};
