"use-client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "I’m a complete beginner. Can I still join Hyperfit?",
    a: "Absolutely. Hyperfit is beginner-friendly, and our coaches guide you step by step at your own pace.",
  },
  {
    q: "Can I try Hyperfit before committing?",
    a: "Yes. You can start with a trial session and experience the training before joining.",
  },
  {
    q: "Is GYM suitable for weight loss?",
    a: "Yes. Our programs are designed to help you lose fat safely and sustainably.",
  },
  {
    q: "Will I get personal guidance?",
    a: "Yes. Our trainers focus on form, progress, and consistency — not pressure.",
  },
  {
    q: "How many days a week should I train?",
    a: "Most members train 3–5 days a week. We help you find what works best for you.",
  },
  {
    q: "How many hours a day should I train?",
    a: "Most members train 45 minutes to 1 Hour a day. We help you find what works best for you.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <>
      <div className="h-[90vh] flex flex-col justify-top items-center rounded-3xl w-[90vw]">
        <div className="py-5">
          <div
            className="w-fit pl-14 text-4xl font-bold bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
          >
            FREQUENTLY
          </div>
          <div className="text-4xl font-bold">ASKED QUESTIONS</div>
        </div>
        <div className="w-full max-w-3xl space-y-6">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                animate={{
                  borderRadius: isOpen ? "28px" : "20px",
                  borderColor: isOpen
                    ? "rgba(255,140,0,0.85)" // bright orange when open
                    : "rgba(255,140,0,0.25)",
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="
                border bg-black/60 backdrop-blur-md min-h-[72px] sm:min-h-[80px]
                px-6 py-5
              "
              >
                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="
    w-full flex items-start justify-between gap-4
    text-left
  "
                >
                  <h3
                    className={`font-semibold transition-all duration-300 leading-snug
      ${
        isOpen
          ? "text-lg sm:text-xl text-orange-400"
          : "text-base sm:text-lg text-white/90"
      }
    `}
                  >
                    {item.q}
                  </h3>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="
      flex-shrink-0
      w-9 h-9 sm:w-10 sm:h-10
      rounded-full bg-white text-black
      flex items-center justify-center
    "
                  >
                    {isOpen ? <X size={18} /> : <Plus size={18} />}
                  </motion.div>
                </button>
                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      
    </>
  );
};

export default Faq;
