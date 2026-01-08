"use-client";
import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <>
      <div className="flex flex-col md:flex lg:flex-row h-fit w-full py-10  px-5 lg:px-10 gap-10">
        <div className="lg:w-[45vw] flex flex-col gap-7">
          <div
            className="text-xl font-bold bg-[linear-gradient(126.6deg,rgba(44,115,210,1)_3.4%,rgba(251,234,255,1)_127.9%)]
        bg-clip-text 
        text-transparent"
          >
            <u>
              <i>OUR SERVICES</i>
            </u>
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
          <div className="text-4xl">
            <div
              className="
            bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent
            "
            >
              NOT JUST WORKOUTS.
            </div>
            <div>A WHOLE NEW APPROACH.</div>
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
          <div
            className="text-xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
          >
            From personal training to nutrition and recovery - we cover what
            your body truly needs.
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
          <div className="flex gap-7 lg:gap-35 font-bold flex-col lg:flex-row w-fit mx-auto">
            <motion.button
              whileHover={{
                backgroundColor: "#f97316",
                scale: 1.1,
                color: "#ffffff",
              }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-orange-500 text-white lg:bg-[#a5a5a5] lg:text-black px-5 py-3 rounded-3xl"
            >
              EXPLORE PRICING
            </motion.button>
            <motion.button
              whileHover={{
                backgroundColor: "#f97316",
                scale: 1.1,
                color: "#ffffff",
              }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-orange-500 text-white lg:bg-[#a5a5a5] lg:text-black px-5 py-3 rounded-3xl"
            >
              CONTACT US
              
            </motion.button>
            
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
          <div
            className="text-2xl py-10 bg-[linear-gradient(126.6deg,rgba(44,115,210,1)_3.4%,rgba(251,234,255,1)_127.9%)]
        bg-clip-text 
        text-transparent"
          >
            MORE THINGS THAT NO GYM WILL PROVIDE YOU!!!
            <div></div>
          </div>
        </div>
        <div className="bg-black lg:w-[45vw] flex flex-col gap-1">
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
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <div
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              01
            </div>
            <div className="flex flex-col justify-end gap-3 pb-3">
              <div
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                PERSONAL TRAINING
              </div>
              <div>
                One-on-one coaching, fully focused on your goals, fitness level,
                and progress.
              </div>
            </div>
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
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <div
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              02
            </div>
            <div className="flex flex-col justify-end gap-3 pb-3">
              <div
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                NUTRITION GUIDANCE
              </div>
              <div>
                Simple, practical food advice that works in real life. No extremes, just balance.
              </div>
            </div>
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
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <div
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              03
            </div>
            <div className="flex flex-col justify-end gap-3 pb-3">
              <div
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                STRENGTH & CONDITIONING
              </div>
              <div>
                Structured programs to build muscle, boost stamina, and stay injury-free.
              </div>
            </div>
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
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <div
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              04
            </div>
            <div className="flex flex-col justify-end gap-3 pb-3">
              <div
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                YOGA & FLEXIBILITY
              </div>
              <div>
                Find balance in your body and mind with calming, mobility-focused sessions.
              </div>
            </div>
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
            className="lg:h-38 border-y-2 border-gray-600 flex flex-col lg:flex-row-reverse justify-around"
          >
            <div
              className="text-5xl lg:text-9xl font-bold flex lg:justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent pt-2"
            >
              05
            </div>
            <div className="flex flex-col justify-end gap-3 pb-3">
              <div
                className="text-xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                PROGRESS TRACKING
              </div>
              <div>
                We track what matters — so you can see how far you’ve come, and where you’re headed next.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
