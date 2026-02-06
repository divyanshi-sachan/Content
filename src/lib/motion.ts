import type { Transition } from "framer-motion";

export const springGentle = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.7,
} as const satisfies Transition;

export const springRigid = {
  type: "spring",
  stiffness: 180,
  damping: 20,
  mass: 0.6,
} as const satisfies Transition;
