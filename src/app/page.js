"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
export default function Home() {
  const menus = [
    "ABOUT",
    "SERVICES",
    "PRICING",
    "TESTIMONIALS",
    "FAQ",
    "CONTACT",
  ];
  const [activeSection, setActiveSection] = useState("Home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const homeSection = document.getElementById("Home");
    if (homeSection) {
      const topOffset = 37 + 74; // height of top bar + height of navbar
      window.scrollTo({
        top: homeSection.offsetTop - topOffset,
        behavior: "auto",
      });
    }

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);
  return (
    <>
      <Image
        src="/images/img-1-gym.avif"
        alt="Gym Image"
        fill
        priority
        quality={90}
        className="object-cover object-[80%_50%] -z-10"
      />

      {/* ✅ ADDED: Overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="hidden md:flex h-[37px] min-w-full items-center justify-center bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_55%,rgba(236,79,9,1)_100%)] z-20">
        <ul className="text-white flex justify-between items-center font-medium text-sm w-full">
          <li className="md:text-xs lg:pl-28 lg:text-sm">
            CONTACT@HYPERFIT.COM &nbsp; / &nbsp; (123) 456 - 7890
          </li>
          <li className="md:text-xs lg:pr-28 lg:text-sm">
            MONDAY - FRIDAY [ 7 AM - 10 PM ] &nbsp; &nbsp; / &nbsp; &nbsp;
            SATURDAY - SUNDAY [ 7 AM - 9 AM ]
          </li>
        </ul>
      </div>

      <div className="sticky top-0 z-50 h-[74px] flex items-center justify-around">
        <div className="font-bold text-2xl text-white flex items-center gap-2">
          <div>
            <Image
              src="/images/real-world-2.png"
              alt="Real World Logo"
              width={50}
              height={50}
              className="mix-blend-multiply"
            />
          </div>
          <a href="#Home" className="scroll-mt-[111px">The Real World</a>
        </div>
        <div>
          <ul className="flex gap-3">
            {menus.map((menu, i) => {
              return (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: activeSection === menu ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  key={i}
                >
                  {mounted && (
                    <a
                      href={`#${menu}`}
                      className={`rounded-full p-3 px-5 font-bold transition hover:bg-orange-500 hover:text-white
                        ${
                          activeSection === menu
                            ? "bg-orange-500 text-white"
                            : "bg-[#a5a5a5] text-black"
                        }`}
                    >
                      {menu}
                    </a>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
        <div className="font-bold text-2xl text-white">Log In</div>
      </div>
      <div>
        <section
          id="Home"
          className="h-screen flex flex-col items-start justify-center gap-4 p-28"
        >
          <h1
            className="
            text-7xl 
            font-bold 
            bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_55%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
          >
            LESS TALK. <br /> MORE WORK.
          </h1>

          <h2 className="text-white text-xl">
            Results that last — <br />
            built through consistency, clarity, and care.
          </h2>
        </section>
      </div>
      <section
        id="ABOUT"
        className="h-screen flex items-center justify-center bg-blue-400"
      >
        <h1 className="text-5xl font-bold">About Section</h1>
      </section>
      <section
        id="SERVICES"
        className="h-screen flex items-center justify-center bg-green-400"
      >
        <h1 className="text-5xl font-bold">Services Section</h1>
      </section>
      <section
        id="PRICING"
        className="h-screen flex items-center justify-center bg-yellow-400"
      >
        <h1 className="text-5xl font-bold">Pricing Section</h1>
      </section>
      <div>
        <section
          id="TESTIMONIALS"
          className="h-screen flex items-center justify-center bg-blue-400"
        >
          <h1 className="text-5xl font-bold">Testimonials Section</h1>
        </section>
        <section
          id="FAQ"
          className="h-screen flex items-center justify-center bg-green-400"
        >
          <h1 className="text-5xl font-bold">FAQ Section</h1>
        </section>
        <section
          id="CONTACT"
          className="h-screen flex items-center justify-center bg-yellow-400"
        >
          <h1 className="text-5xl font-bold">Contact Section</h1>
        </section>
      </div>
      {/* </div> */}
    </>
  );
}
