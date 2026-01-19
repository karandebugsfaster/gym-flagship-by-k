"use client";
import { motion } from "framer-motion";
import { fadeDown, fadeUp, fadeLeft, fadeRight } from "./animations";

const Loader = ({ onFinish }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.4 }}
      onAnimationComplete={onFinish}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.3),transparent_60%)] animate-pulse" />

      {/* Outer spinning ring */}
      <motion.div
        className="absolute h-40 w-40 rounded-full border-[3px] border-transparent 
        border-t-orange-500 border-r-orange-400"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
      />
    
      {/* Inner breathing ring */}
      <motion.div
        className="absolute h-28 w-28 rounded-full border border-orange-500/30"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />

      {/* TEXT BLOCK */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center"
      >
        <motion.div
          className="text-4xl font-extrabold tracking-widest 
          bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
          bg-clip-text text-transparent"
          animate={{
            letterSpacing: ["0.2em", "0.35em", "0.2em"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          LOADING
        </motion.div>

        <motion.div
          variants={fadeDown}
          initial="hidden"
          animate="show"
          className="mt-3 text-xs tracking-widest text-white"
        >
          PREPARING EXPERIENCE 🚀
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
