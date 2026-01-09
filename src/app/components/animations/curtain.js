export const curtainContainer = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const curtainPanel = {
  hidden: { scaleY: 1 },
  show: {
    scaleY: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};
