import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const Signup = () => {
  return (
    <>
      <motion.div
        className="
    fixed 
    right-0 
    bottom-1/6 
    -translate-y-1/2
    z-50
    block
    lg:hidden
  "
      >
       
          <motion.button
            initial={{ x: 70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileTap={{ scale: 1.1 }}
            className="
          font-semibold
          px-3
          "
          >
            <Image
              src="/images/whatsapp-logo-2.svg"
              alt="instagram-log0"
              height={45}
              width={45}
              quality={100}
              className="cursor-pointer"
            />
          </motion.button>
       
      </motion.div>
    </>
  );
};

export default Signup;
