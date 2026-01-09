// Parent container animation
export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // children animate one by one
      delayChildren: 0.1, // slight delay before first child
    },
  },
};

// Individual item animation
export const item = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
    duration: 0.6,
    ease: "easeOut",
    },
  },
};

export * from "./fade";

export * from "./curtain";

// Fade-in animation
// export const fadeIn = {
//   hidden: { opacity: 0 }}