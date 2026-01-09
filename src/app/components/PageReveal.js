"use client";
import { motion } from "framer-motion";
import { curtainContainer, curtainPanel } from "./animations";

const PageReveal = () => {
  return (
    <motion.div
      variants={curtainContainer}
      initial="hidden"
      animate="show"
      className="fixed inset-0 z-[999] flex"
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={curtainPanel}
          className="flex-1 bg-black origin-top"
        />
      ))}
    </motion.div>
  );
};

export default PageReveal;
