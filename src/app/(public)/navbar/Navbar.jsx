"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fadeRight,
  fadeLeft,
  fadeDown,
  fadeUp,
} from "@/app/components/animations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const menus = ["about", "services", "pricing", "faq", "contact"];
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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
    const homeSection = document.getElementById("home");
    if (homeSection) {
      const topOffset = 37 + 74;

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
      { threshold: 0.5 }
    );
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  const handleMobileNavClick = (menu) => {
    setToggleMenu(false);

    const section = document.getElementById(menu);
    if (!section) return;

    // top bar + navbar height

    // window.scrollTo({
    //   top: section.offsetTop,
    //   behavior: "smooth",

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <motion.div
        className={`sticky top-0 z-50 h-[74px] flex items-center justify-around transition-all duration-300 ease-out
        ${scrolled ? "bg-black/50 backdrop-blur shadow-md" : "bg-transparent"}
        `}
      >
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="font-bold text-2xl text-white flex items-center gap-2"
        >
          <motion.div className="relative z-10">
            <Image
              src="/images/real-world-2.png"
              alt="Real World Logo"
              width={50}
              height={50}
              className="mix-blend-multiply"
            />
          </motion.div>
          <motion.button
            className="cursor-pointer"
            onClick={() =>
              document.getElementById("home")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            The Real World
          </motion.button>
        </motion.div>
        <motion.div>
          <ul className="flex gap-3">
            {menus.map((menu, i) => {
              return (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: activeSection === menu ? 1.1 : 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="hidden lg:flex"
                  key={i}
                >
                  {mounted && (
                    <motion.button
                      onClick={() => handleMobileNavClick(menu)}
                      className={`rounded-full p-3 px-5 font-bold transition hover:bg-orange-500 hover:text-white cursor-pointer
                        ${
                          activeSection === menu
                            ? "bg-orange-500 text-white"
                            : "bg-[#a5a5a5] text-black"
                        }`}
                    >
                      {menu.toUpperCase()}
                    </motion.button>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex items-center justify-center gap-1 md:gap-4 lg:gap-1"
        >
          <motion.div className="relative z-10">
            <Link href="/sign-up">
              <Image
                src="/images/avatar-loop.gif"
                alt="Avatar"
                width={40}
                height={40}
                className="mix-blend-multiply"
              />
            </Link>
          </motion.div>
          <motion.div className="relative z-10 lg:hidden">
            <motion.button
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
                className="mix-blend-multiply"
              />
            </motion.button>
          </motion.div>
          <Link href="/sign-up">
            <motion.button
              className="font-bold text-l hidden lg:flex rounded-full p-3 px-5 bg-[#a5a5a5] text-black hover:bg-orange-500 hover:text-white cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              SIGN-UP
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      {/* BACKDROP */}
      {toggleMenu && (
        <motion.div
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
    fixed top-0 right-0 min-h-screen w-[70%] sm:w-[50%]
    bg-black/70 backdrop-blur
    z-50
    flex flex-col gap-6
    pt-28 px-6
    lg:hidden"
      >
        <motion.button
          onClick={() => setToggleMenu(false)}
          className="absolute top-6 right-6 text-white text-3xl font-bold"
        >
          ✕
        </motion.button>
        <ul className="flex flex-col py-1 gap-10">
          {menus.map((menu, i) => {
            return (
              <motion.li
                variants={fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ scale: 1.1 }}
                animate={{ scale: activeSection === menu ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                key={i}
              >
                {mounted && (
                  <motion.button
                    onClick={() => handleMobileNavClick(menu)}
                    className={`rounded-full p-3 px-5 font-bold transition hover:bg-orange-500 hover:text-white
                        ${
                          activeSection === menu
                            ? "bg-orange-500 text-white"
                            : "bg-[#a5a5a5] text-black"
                        }`}
                  >
                    {menu.toUpperCase()}
                  </motion.button>
                )}
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
};

export default Navbar;
