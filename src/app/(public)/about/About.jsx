"use-client";
import React from "react";
import Infinite from "./Infinite";
import Text from "./Text";
import Images from "./Images";
import { container, item } from "@/app/components/animations";
import { motion } from "framer-motion";
const About = () => {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="
      min-h-screen w-full
      // grid-rows-[25vh_30vh_auto]
      // sm:grid-rows-[22vh_33vh_45vh]
      // md:grid-rows-[20vh_35vh_45vh]
      // lg:grid-rows-[20vh_35vh_45vh]
      // xl:grid-rows-[18vh_32vh_50vh]
      // supports-[height:100vh]:grid-rows-[25vh_30vh_auto]
      // supports-[height:100vh]:sm:grid-rows-[22vh_33vh_45vh]
      // supports-[height:100vh]:md:grid-rows-[20vh_35vh_45vh]
      // supports-[height:100vh]:xl:grid-rows-[18vh_32vh_50vh]
      // overflow-hidden "
    >
      {/* 20% */}
      <motion.div variants={item} className="flex justify-center items-center">
        <Infinite />
      </motion.div>

      {/* 35% */}
      <motion.div variants={item} className="flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
        <Text />
      </motion.div>

      {/* 45% */}
      <motion.div variants={item}>
        <Images />
      </motion.div>
    </motion.main>
  );
};

export default About;
