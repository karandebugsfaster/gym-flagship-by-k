import React from "react";
import { fadeDown } from "@/app/components/animations";
import { motion } from "framer-motion";

const navbarOrange = () => {
  return (
    <motion.div
      variants={fadeDown}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex items-center justify-center"
    >
      <motion.div className="hidden md:flex h-[37px] px-5 bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_55%,rgba(236,79,9,1)_100%)] z-20 rounded-4xl">
        <motion.ul className="text-white flex justify-center md:gap-10 lg:gap-50 items-center font-medium text-sm w-full">
          <motion.li className="md:text-xs  lg:text-sm">
            CONTACT@HYPERFIT.COM &nbsp;/&nbsp; (123) 456 - 7890
          </motion.li>
          <motion.li className="md:text-xs lg:text-sm">
            MONDAY - FRIDAY [ 7 AM - 10 PM ] &nbsp;/&nbsp; SATURDAY - SUNDAY [ 7
            AM - 9 AM ]
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default navbarOrange;
