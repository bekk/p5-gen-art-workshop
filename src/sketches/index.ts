import P5 from "p5";
import { mySketch } from "./mySketch.js";

export type SketchClosure = (p: P5) => void;

export const sketches: Record<string, SketchClosure> = {
  "Min sketch (JS)": mySketch,
};
