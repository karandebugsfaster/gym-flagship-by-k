import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { container, item } from "@/app/components/animations";

const Contact = () => {
  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="min-h-screen flex justify-around items-center lg:px-15"
      >
        <motion.div
          variants={item}
          className="h-[90vh] w-full rounded-3xl text-center flex flex-col gap-5"
        >
          <motion.div
            variants={item}
            className="text-4xl md:text-5xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent
            font-bold"
          >
            <motion.div
              variants={item}
              className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2"
            />
            <i>REACH OUT TO US</i>
          </motion.div>
          <motion.div variants={item} className="text-2xl md:text-3xl">
            Book your free training session now...
          </motion.div>
          <motion.div variants={item} className="text-lg md:text-xl">
            Send us "HII" on Whatsapp / Instagram, Our team will reach you out
          </motion.div>
          <motion.div
            variants={item}
            className="text-lg md:text-xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            <motion.div
              variants={item}
              className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2"
            />
            "TAP" on Whatsapp Icon and text "HII"
          </motion.div>

          <motion.div
            variants={item}
            className="flex justify-center items-center gap-5 text-lg md:text-xl border-2 w-fit text-center mx-auto px-7 py-3 rounded-3xl border-orange-500"
          >
            <motion.div>
              <Image
                src="/images/whatsapp-logo-2.svg"
                alt="instagram-log0"
                height={45}
                width={45}
                quality={100}
                variants={item}
                className="cursor-pointer"
              />
            </motion.div>
            <motion.div>+91-1234567890</motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="text-lg md:text-xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            "TAP" on Instagram Icon and text "HII"
          </motion.div>
          <motion.div
            variants={item}
            className="flex justify-center items-center gap-5 text-lg md:text-xl border-2 w-fit text-center mx-auto px-5 py-3 rounded-3xl border-orange-500"
          >
            <motion.div>
              <Image
                src="/images/instagram-2-logo.svg"
                alt="instagram-log0"
                height={90}
                width={90}
                quality={90}
                variants={item}
                className="cursor-pointer"
              />
            </motion.div>
            <motion.div>@THE-REAL-WORLD</motion.div>
          </motion.div>
          <motion.div
            variants={item}
            className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            <motion.div
              variants={item}
              className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2"
            />
            You are heartly welcomed at our gym.
          </motion.div>
          <motion.div
            variants={item}
            className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            VISIT SOON!!{" "}
          </motion.div>
          <motion.div
            variants={item}
            className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            STAY FIT
          </motion.div>
          <motion.div
            variants={item}
            className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            STAY HAPPY
          </motion.div>
          <motion.div
            variants={item}
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
