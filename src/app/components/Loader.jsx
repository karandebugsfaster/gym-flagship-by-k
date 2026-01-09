"use client";
import { motion } from "framer-motion";

const Loader = ({ onFinish }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      onAnimationComplete={onFinish}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-white text-3xl font-bold"
      >
        LOADING...
      </motion.div>
    </motion.div>
  );
};

export default Loader;
