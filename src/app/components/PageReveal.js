"use client";
import { motion, AnimatePresence } from "framer-motion";
import { curtainContainer, curtainPanel } from "./animations";
import { useEffect, useState } from "react";

const PageReveal = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={curtainContainer}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              variants={curtainPanel}
              className="flex-1 bg-black origin-top"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageReveal;
