"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavbarOrange from "./(public)/navbar-orange/Navbar-orange";
import Navbar from "./(public)/navbar/Navbar";
import About from "./(public)/about/About";
import Services from "./(public)/services-section/Services";
import Pricing from "./(public)/pricing/Pricing";
import Faq from "./(public)/faq/Faq";
import Contact from "./(public)/contact/Contact";
import signup from "./(auth)/sign-up/page";

export default function Home() {
  return (
    <>
      <Image
        src="/images/img-1-gym.avif"
        alt="Gym Image"
        fill
        priority
        quality={90}
        className="
        object-cover
        object-[60%_50%]
        sm:object-[70%_50%]
        lg:object-[80%_50%] 
        -z-10"
      />
      <div className="absolute inset-0 bg-black/20 -z-10 pointer-events-none" />
      <Navbar />
      <section
        id="home"
        className="min-h-[calc(100vh-130px)] sm:min-h-[calc(100vh-130px)] md:min-h-[calc(100vh-130px)] lg:min-h-[calc(100vh-74px)] scroll-mt-[150px]"
      >
        <NavbarOrange />
        <div className="min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] lg:min-h-[calc(100vh-260px)] flex flex-col justify-end-safe">
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 pl-4 sm:pl-8 md:pl-12 lg:pl-24 pr-2">
            <h1
              className="
              text-5xl sm:text-5xl md:text-6xl lg:text-7xl 
              font-bold 
              bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
              bg-clip-text 
              text-transparent
              z-10
              "
            >
              LESS TALK. <br /> MORE WORK.
            </h1>

            <h2 className="text-white text-2xl relative z-10">
              Results that last — <br />
              built through consistency, clarity, and care.
            </h2>
          </div>
        </div>
      </section>
      <section id="about" className="min-h-screen">
        <About />
      </section>

      <section id="services" className="min-h-screen bg-[#0D0D0D]">
        <Services />
      </section>
      <section id="pricing" className="min-h-screen">
        <Pricing />
      </section>
      <section
        id="faq"
        className="min-h-screen flex justify-center items-center"
      >
        <Faq />
      </section>
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
    </>
  );
}
