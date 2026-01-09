import React from "react";
import { motion } from "framer-motion";
import { container, item } from "@/app/components/animations";

const Text = () => {
  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex items-center justify-center flex-col sm:gap-4 md:gap-5"
      >
        <motion.div
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl pt-2
        font-bold
        bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
        >
          NOT JUST A GYM
        </motion.div>
        <motion.div variants={item} className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
          A PLACE TO{" "}
          <b
            className="bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            EVOLVE.
          </b>
        </motion.div>
        <motion.div
          variants={item}
          className="
            text-base sm:text-lg md:text-xl
            max-w-[90%] sm:max-w-[80%] md:max-w-[700px]
            text-white/80 flex flex-col items-center"
        >
          <motion.div>Built for real people. Real goals.</motion.div>
          <motion.div>Real progress. No matter where</motion.div>
          <motion.div>you start— you belong here.</motion.div>
        </motion.div>
        <motion.div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent" />
      </motion.div>
    </>
  );
};

export default Text;
