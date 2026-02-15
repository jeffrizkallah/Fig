import { useTransform, type MotionValue } from "motion/react";
import { interpolate } from "flubber";

export function useFlubber(
  progress: MotionValue<number>,
  paths: string[]
) {
  return useTransform(
    progress,
    paths.map((_, i) => i / (paths.length - 1)),
    paths,
    {
      mixer: (a: string, b: string) =>
        interpolate(a, b, { maxSegmentLength: 10 }),
    }
  );
}
