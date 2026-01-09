import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { container, item } from "@/app/components/animations";
const Images = () => {
  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="border-2 rounded-3xl mx-4 my-4 bg-zinc-800 border-orange-400"
      >
        <motion.div
          variants={item}
          className="text-center text-5xl py-5 bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
        >
          GLIMPSES OF OUR GYM
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent mb-2"
        />
        <motion.div
          variants={item}
          className="flex items-center justify-around flex-col md:flex-row gap-5 sm:gap-6 md:gap-10 lg:gap-2 py-5 sm:py-8  sm:px-7 md:px-7"
        >
          <motion.div
            variants={item}
            className="border-2 h-fit flex flex-col gap-4 py-3 px-4 rounded-3xl bg-black border-orange-500"
          >
            <motion.div
              variants={item}
              className="h-100 md:h-70 w-80 md:w-100 rounded-3xl text-center relative border-4 border-orange-500 overflow-hidden"
            >
              <Image
                src="/images/gym-image-1.jpg"
                alt="image-1"
                fill
                quality={90}
                variants={item}
                className="
            object-cover
            "
              />
            </motion.div>
            <motion.div className="flex justify-center gap-3">
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                variants={item}
                className="bg-orange-400 text-white  
              px-7 py-3 rounded-3xl w-fit x-auto text-lg font-bold"
              >
                Cardio Section
              </motion.button>
              <Image
                src="/images/cycling-2.gif"
                alt="cycling"
                height={50}
                width={50}
                variants={item}
                // className="mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="border-2 h-fit flex flex-col gap-4 py-3 px-4 rounded-3xl bg-black border-orange-500"
          >
            <motion.div
              variants={item}
              className="h-100 md:h-70 w-80 md:w-100 rounded-3xl text-center relative border-4 border-orange-500 overflow-hidden"
            >
              <Image
                src="/images/gym-image-2.jpg"
                alt="image-1"
                fill
                quality={90}
                variants={item}
                className="
            object-cover
            "
              />
            </motion.div>
            <motion.div variants={item} className="flex justify-center gap-3">
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                variants={item}
                className="bg-orange-400 text-white  
              px-7 py-3 rounded-3xl w-fit x-auto text-lg font-bold"
              >
                Dumbbell Section
              </motion.button>
              <Image
                src="/images/dumbbell-white.svg"
                alt="dubbell"
                height={50}
                width={50}
                variants={item}

                // className="mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="border-2 h-fit flex flex-col gap-4 py-3 px-4 rounded-3xl bg-black border-orange-500"
          >
            <motion.div
              variants={item}
              className="h-100 md:h-70 w-80 md:w-100 rounded-3xl text-center relative border-4 border-orange-500 overflow-hidden"
            >
              <Image
                src="/images/gym-image-3.png"
                alt="image-1"
                fill
                quality={90}
                variants={item}
                className="
            object-cover
            "
              />
            </motion.div>
            <motion.div variants={item} className="flex justify-center gap-3">
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                variants={item}
                className="bg-orange-400 text-white  
              px-7 py-3 rounded-3xl w-fit x-auto text-lg font-bold"
              >
                Machine Section
              </motion.button>
              <Image
                src="/images/pushups-black-gym.gif"
                alt="gym"
                height={60}
                width={60}
                variants={item}

                // className="mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Images;
