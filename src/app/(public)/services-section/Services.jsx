"use-client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { container, item } from "@/app/components/animations";

const Services = () => {
  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col md:flex lg:flex-row h-fit w-full py-10  px-5 lg:px-10 gap-10"
      >
        <motion.div variants={item} className="lg:w-[45vw] flex flex-col gap-7">
          <motion.div variants={item} className="gap-3">
            <motion.div
              variants={item}
              className="text-xl font-bold bg-[linear-gradient(126.6deg,rgba(44,115,210,1)_3.4%,rgba(251,234,255,1)_127.9%)]
            bg-clip-text flex justify-center items-center
            text-transparent"
            >
              <u>
                <i>OUR SERVICES</i>
              </u>
              <motion.div>
                <Image
                  src="/images/star.gif"
                  alt="star"
                  height={50}
                  width={50}
                  variants={item}

                  // className="mix-blend-multiply"
                />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            variants={item}
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2"
          />
          <motion.div variants={item} className="text-4xl">
            <motion.div
              variants={item}
              className="
            bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent
            "
            >
              NOT JUST WORKOUTS.
            </motion.div>
            <motion.div>A WHOLE NEW APPROACH.</motion.div>
          </motion.div>
          <motion.div
            variants={item}
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2"
          />
          <motion.div
            variants={item}
            className="text-xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
          >
            From personal training to nutrition and recovery - we cover what
            your body truly needs.
          </motion.div>
          <motion.div
            variants={item}
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2"
          />
          <motion.div
            variants={item}
            className="flex gap-6 font-bold flex-col lg:flex-row w-fit mx-auto"
          >
            <motion.div variants={item} className="flex justify-center gap-3">
              <motion.button
                whileHover={{
                  backgroundColor: "#f97316",
                  scale: 1.1,
                  color: "#ffffff",
                }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() =>
                  document.getElementById("pricing")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                variants={item}
                className="bg-orange-500 text-white lg:bg-[#a5a5a5] lg:text-black px-5 py-3 rounded-3xl cursor-pointer"
              >
                EXPLORE PRICING
              </motion.button>
              <Image
                src="/images/price.gif"
                alt="price"
                height={50}
                width={50}
                variants={item}

                // className="mix-blend-multiply"
              />
            </motion.div>
            <motion.div variants={item} className="flex justify-center gap-3">
              <motion.button
                whileHover={{
                  backgroundColor: "#f97316",
                  scale: 1.1,
                  color: "#ffffff",
                }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                variants={item}
                className="bg-orange-500 text-white lg:bg-[#a5a5a5] lg:text-black px-5 py-3 rounded-3xl cursor-pointer"
              >
                CONTACT US
              </motion.button>
              <Image
                src="/images/whatsapp-logo-2.svg"
                alt="cycling"
                height={50}
                width={50}
                variants={item}

                // className="mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={item}
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2"
          />
          <motion.div
            variants={item}
            className="text-2xl py-5 bg-[linear-gradient(126.6deg,rgba(44,115,210,1)_3.4%,rgba(251,234,255,1)_127.9%)]
        bg-clip-text 
        text-transparent"
          >
            MORE THINGS THAT NO GYM WILL PROVIDE YOU!!!
            <Image
              src="/images/medal-loop.gif"
              alt="medal"
              height={50}
              width={50}
              variants={item}

              // className="mix-blend-multiply"
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={item}
          className="bg-black lg:w-[45vw] flex flex-col gap-1"
        >
          <motion.div
            whileHover={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.01,
            }}
            whileTap={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.1,
            }}
            transition={{ duration: 0.15 }}
            variants={item}
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <motion.div
              variants={item}
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              01
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col justify-end gap-3 pb-3"
            >
              <motion.div
                variants={item}
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                PERSONAL TRAINING
              </motion.div>
              <motion.div>
                One-on-one coaching, fully focused on your goals, fitness level,
                and progress.
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            whileHover={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.01,
            }}
            whileTap={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.1,
            }}
            transition={{ duration: 0.15 }}
            variants={item}
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <motion.div
              variants={item}
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              02
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col justify-end gap-3 pb-3"
            >
              <motion.div
                variants={item}
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                NUTRITION GUIDANCE
              </motion.div>
              <motion.div>
                Simple, practical food advice that works in real life. No
                extremes, just balance.
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            whileHover={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.01,
            }}
            whileTap={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.1,
            }}
            transition={{ duration: 0.15 }}
            variants={item}
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <motion.div
              variants={item}
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              03
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col justify-end gap-3 pb-3"
            >
              <motion.div
                variants={item}
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                STRENGTH & CONDITIONING
              </motion.div>
              <motion.div>
                Structured programs to build muscle, boost stamina, and stay
                injury-free.
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            whileHover={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.01,
            }}
            whileTap={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.1,
            }}
            transition={{ duration: 0.15 }}
            variants={item}
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <motion.div
              variants={item}
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              04
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col justify-end gap-3 pb-3"
            >
              <motion.div
                variants={item}
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                YOGA & FLEXIBILITY
              </motion.div>
              <motion.div>
                Find balance in your body and mind with calming,
                mobility-focused sessions.
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            whileHover={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.01,
            }}
            whileTap={{
              outline: "4px solid #f97316",
              outlineOffset: "0px",
              scale: 1.1,
            }}
            variants={item}
            transition={{ duration: 0.15 }}
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <motion.div
              variants={item}
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              05
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col justify-end gap-3 pb-3"
            >
              <motion.div
                variants={item}
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                PROGRESS TRACKING
              </motion.div>
              <motion.div>
                We track what matters — so you can see how far you’ve come, and
                where you’re headed next.
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Services;
