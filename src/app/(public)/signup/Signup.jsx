import React from "react";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <>
      <motion.div
        className="
    fixed 
    right-0 
    top-1/8 
    -translate-y-1/2
    z-50

    block
    lg:hidden
  "
      >
        <motion.button
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileTap={{ scale: 0.95 }}
          className="
      bg-orange-500
      text-white
      font-semibold

      px-5
      py-3

      rounded-l-2xl
      rounded-r-none

      shadow-lg
      active:bg-orange-600
    "
        >
          Sign up
        </motion.button>
      </motion.div>
    </>
  );
};

export default Signup;
