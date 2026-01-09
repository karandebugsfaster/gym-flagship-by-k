"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Infinite = () => {
  //   const items = ["HTML", "CSS", "JavaScript", "React", "Next.js","HTML", "CSS", "JavaScript", "React", "Next.js"];
  const items = [
    { title: "STRENGTH", img: "/images/dumbbell-white.svg", titsvg:"error" },
    { title: "FAT LOSS", img: "/images/fire.svg", titsvg:"error" },
    { title: "MOVING ON", img: "/images/heart.svg", titsvg:"error" },
    { title: "CONSISTENCY", img: "/images/time-white.svg", titsvg:"error" },
    { title: "INJURY SAFE", img: "/images/shield.svg", titsvg:"error" },
    { title: "STRENGTH", img: "/images/dumbbell-white.svg", titsvg:"error" },
    { title: "FAT LOSS", img: "/images/fire.svg", titsvg:"error" },
    { title: "MOVING ON", img: "/images/heart.svg", titsvg:"error" },
    { title: "CONSISTENCY", img: "/images/time-white.svg", titsvg:"error" },
    { title: "INJURY SAFE", img: "/images/shield.svg", titsvg:"error" },
  ];
  return (
    <div className="overflow-hidden w-full bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_55%,rgba(236,79,9,1)_100%)] py-6">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {/* DUPLICATE CONTENT */}
        {[...items, ...items].map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </motion.div>
    </div>
  );
};
function Item({ item }) {
  return (
    <div className="min-w-[200px] h-[100px] bg-black text-white flex items-center justify-center rounded-xl mx-3 text-xl font-bold gap-2 border-2">
      <Image
        src={item.img}
        alt={item.titsvg}
        width={50}
        height={50}
        className="object-contain"
      />
      <span className="text-lg font-semibold">{item.title}</span>
    </div>
  );
}
export default Infinite;
