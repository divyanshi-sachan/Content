import { useEffect } from "react";
import type { UseScrollOptions } from "framer-motion";
import {
  MotionValue,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { springGentle, springRigid } from "./motion";

type SectionMotionConfig = {
  minScale?: number;
  yFrom?: number;
  yTo?: number;
  bgFrom?: number;
  bgTo?: number;
  offset?: [string, string];
};

export const useCursorMotion = (ref: React.RefObject<HTMLElement | null>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY, ref]);

  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), springGentle);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-16, 16]), springGentle);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springRigid);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springRigid);
  const innerX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springGentle);
  const innerY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), springGentle);

  return { parallaxX, parallaxY, tiltX, tiltY, innerX, innerY };
};

export const useCameraTilt = (ref: React.RefObject<HTMLElement | null>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY, ref]);

  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springRigid);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springRigid);
  const driftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springGentle);
  const driftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springGentle);

  return { tiltX, tiltY, driftX, driftY };
};

export const use3DScroll = (
  ref: React.RefObject<HTMLElement | null>,
  {
    zFrom = -200,
    zTo = 60,
    rotateFrom = 3,
    rotateTo = -1,
    scaleFrom = 0.95,
    scaleTo = 1,
    offset = ["start 0.9", "end 0.1"],
  }: {
    zFrom?: number;
    zTo?: number;
    rotateFrom?: number;
    rotateTo?: number;
    scaleFrom?: number;
    scaleTo?: number;
    offset?: [string, string];
  } = {},
) => {
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: offset as UseScrollOptions["offset"],
  });
  const velocity = useVelocity(scrollY);
  const velocityBoost = useTransform(velocity, [-900, 0, 900], [1.08, 1, 0.92]);

  const z = useSpring(useTransform(scrollYProgress, [0, 1], [zFrom, zTo]), springRigid);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [rotateFrom, rotateTo]), springGentle);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]), springGentle);

  return { scrollYProgress, scrollY, velocity, velocityBoost, z, rotateX, scale };
};

export const useSectionMotion = (
  ref: React.RefObject<HTMLElement>,
  config: SectionMotionConfig = {},
) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (config.offset ?? ["start 0.9", "end 0.1"]) as UseScrollOptions["offset"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [config.minScale ?? 0.985, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [config.yFrom ?? 40, config.yTo ?? -30]);
  const bgY = useTransform(scrollYProgress, [0, 1], [config.bgFrom ?? -30, config.bgTo ?? 30]);

  return { scrollYProgress, scale, y, bgY };
};

export const useJitter = (
  amplitude: MotionValue<number>,
  phase = 0,
) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame((time) => {
    const amp = amplitude.get();
    const t = time / 1000;
    x.set(Math.sin(t * 3.2 + phase) * amp);
    y.set(Math.cos(t * 2.6 + phase) * amp);
  });

  return { x, y };
};
