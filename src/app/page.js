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
  const [scrolled, setScrolled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted]);

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
        className="
        object-cover
        object-[60%_50%]
        sm:object-[70%_50%]
        lg:object-[80%_50%] 
        -z-10"
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

      <div
        className={`sticky top-0 z-50 h-[74px] flex items-center justify-around transition-all duration-300 ease-out
        ${scrolled ? "bg-black/50 backdrop-blur shadow-md" : "bg-transparent"}
      `}
      >
        <div className="font-bold text-2xl text-white flex items-center gap-2">
          <div className="relative z-10">
            <Image
              src="/images/real-world-2.png"
              alt="Real World Logo"
              width={50}
              height={50}
              className="mix-blend-multiply"
            />
          </div>
          <a href="#Home">The Real World</a>
        </div>
        <div>
          <ul className="flex gap-3">
            {menus.map((menu, i) => {
              return (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: activeSection === menu ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="hidden lg:flex"
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
        <div className="flex items-center justify-center gap-1 md:gap-4 lg:gap-1">
          <div className="relative z-10">
            <Image
              src="/images/avatar-loop.gif"
              alt="Avatar"
              width={40}
              height={40}
              className="mix-blend-multiply"
            />
          </div>
          <div className="relative z-10 lg:hidden">
            <button
              className="cursor-pointer"
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              <Image
                src="/images/hamburger-white.svg"
                alt="Avatar"
                width={40}
                height={40}
                className="mix-blend-multiply "
              />
            </button>
          </div>
          <motion.div
            className="font-bold text-l hidden lg:flex rounded-full p-3 px-5 bg-[#a5a5a5] text-black hover:bg-orange-500 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            SIGN-UP
          </motion.div>
        </div>
      </div>
      {/* BACKDROP */}
      {toggleMenu && (
        <div
          onClick={() => setToggleMenu(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* MOBILE MENU */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: toggleMenu ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="
         fixed top-0 right-0 h-screen w-[70%] sm:w-[50%]
         bg-black/70 backdrop-blur
         z-50
         flex flex-col gap-6
         pt-28 px-6
         lg:hidden"
      >
        <button
          onClick={() => setToggleMenu(false)}
          className="absolute top-6 right-6 text-white text-3xl font-bold"
        >
          ✕
        </button>

        {/* {menus.map((menu, i) => (
          <a
            key={i}
            href={`#${menu}`}
            onClick={() => setToggleMenu(false)}
            className="text-white text-lg font-bold hover:text-orange-500"
          >
            {menu}
          </a>
        ))} */}
        <ul className="flex flex-col py-1 gap-10">
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
      </motion.div>
      <div>
        <section
          id="Home"
          className="h-screen flex flex-col items-start justify-end-safe lg:justify-center pb-[189px] md:pb-[250px] lg:pb-0 gap-4 sm:gap-5 md:gap-6 p-6 sm:p-10 md:p-16 lg:p-28 scroll-mt-[111px]"
        >
          <h1
            className="
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            font-bold 
            bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_55%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent
            "
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
