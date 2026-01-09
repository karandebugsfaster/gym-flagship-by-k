import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Pricing = () => {
  return (
    <>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
      <div
        className="text-center py-3 text-5xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent font-bold"
      >
        <i>OUR PRICES</i>
      </div>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
      <div className="min-h-screen flex justify-around flex-col lg:flex-row items-center gap-10 sm:gap-15 md:gap-20 px-7 py-5 sm:py-8">
        <div className="h-[75vh] w-full rounded-3xl relative border-2 border-orange-500 bg-gray-800">
          <div className="h-[25vh] rounded-2xl mx-2 my-3 relative overflow-hidden border-2 border-orange-500">
            <Image
              src="/images/solo-gym.avif"
              alt="image-1"
              fill
              quality={90}
              className="object-cover object-[center_10%]"
            />
          </div>
          <div className="h-[45vh] rounded-2xl mx-2 my-3 px-7 border-2 border-orange-500 bg-black">
            <div className="gap-5 flex flex-col px-3 py-4">
              <h1
                className="text-4xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                <u>
                  <i>SOLO - PACKS</i>
                </u>
              </h1>
              <div className="gap-1 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">1000₹</div>{" "}
                  <div className="text-lg"> / month</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">5000₹</div>{" "}
                  <div className="text-lg"> / 3 month</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">7000₹</div>{" "}
                  <div className="text-lg"> / 6 month</div>
                </div>
                <div className="flex items-baseline gap-1 border-2 border-orange-500 w-fit py-2 px-3 rounded-3xl">
                  <div className="text-3xl">8000₹</div>{" "}
                  <div className="text-lg"> / 12 month</div>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex justify-center"
            >
              <button
                className="flex justify-center items-center bg-orange-500  text-white  w-fit py-3 px-6 rounded-3xl mt-4 lg:m-2 font-bold text-sm md:text-lg cursor-pointer"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                BOOK YOUR FREE TRIAL
              </button>
            </motion.div>
          </div>
        </div>
        <div className="h-[75vh] w-full rounded-3xl relative border-2 border-orange-500 bg-gray-800">
          <div className="h-[25vh] rounded-2xl mx-2 my-3 relative overflow-hidden border-2 border-orange-500">
            <Image
              src="/images/duo-gym.jpg"
              alt="image-1"
              fill
              quality={90}
              className=" object-cover object-[center_10%]"
            />
          </div>
          <div className="h-[45vh] rounded-2xl mx-2 my-3 px-7 border-2 border-orange-500 bg-black">
            <div className="gap-5 flex flex-col px-3 py-4">
              <h1
                className="text-4xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                <u>
                  <i>DUO - PACKS</i>
                </u>
              </h1>
              <div className="gap-1 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">800₹</div>{" "}
                  <div className="text-lg"> / month</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">4500₹</div>{" "}
                  <div className="text-lg"> / 3 month</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">6000₹</div>{" "}
                  <div className="text-lg"> / 6 month</div>
                </div>
                <div className="flex items-baseline gap-1 border-2 border-orange-500 w-fit py-2 px-3 rounded-3xl">
                  <div className="text-3xl">7500₹</div>{" "}
                  <div className="text-lg"> / 12 month</div>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex justify-center"
            >
              <button
                className="flex justify-center items-center bg-orange-500  text-white  w-fit py-3 px-6 rounded-3xl mt-4 lg:m-2 font-bold text-sm md:text-lg cursor-poinbutton"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                BOOK YOUR FREE TRIAL
              </button>
            </motion.div>
          </div>
        </div>
        <div className="h-[75vh] w-full rounded-3xl relative border-2 border-orange-500 bg-gray-800">
          <div className="h-[25vh] rounded-2xl mx-2 my-3 relative overflow-hidden border-2 border-orange-500">
            <Image
              src="/images/group-gym.webp"
              alt="image-1"
              fill
              quality={90}
              className=" object-cover"
            />
          </div>
          <div className="h-[45vh] rounded-2xl mx-2 my-3 px-7 border-2 border-orange-500 bg-black">
            <div className="gap-5 flex flex-col px-3 py-4">
              <h1
                className="text-3xl md:text-4xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
              >
                <u>
                  <i>GROUP - PACKS</i>
                </u>
              </h1>
              <div className="gap-1 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">700₹</div>{" "}
                  <div className="text-lg"> / month</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">4000₹</div>{" "}
                  <div className="text-lg"> / 3 month</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl">6000₹</div>{" "}
                  <div className="text-lg"> / 6 month</div>
                </div>
                <div className="flex items-baseline gap-1 border-2 border-orange-500 w-fit py-2 px-3 rounded-3xl">
                  <div className="text-3xl">7000₹</div>{" "}
                  <div className="text-lg"> / 12 month</div>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex justify-center"
            >
              <button
                className="flex justify-center items-center bg-orange-500  text-white  w-fit py-3 px-6 rounded-3xl mt-4 lg:m-2 font-bold text-sm md:text-lg cursor-pointer"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                BOOK YOUR FREE TRIAL
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
    </>
  );
};

export default Pricing;
