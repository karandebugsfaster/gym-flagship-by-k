"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { openWhatsApp } from "@/lib/whatsapp";

export default function Whatsapp() {
  const phone = "9316015760";
  const message = "Hi, I am interested in your gym";

  return (
    <motion.div
      className="
        fixed right-4 bottom-6 z-50
        lg:hidden
      "
      initial={{ x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => openWhatsApp(phone, message)}
        className="rounded-full shadow-lg"
      >
        <Image
          src="/images/whatsapp-logo-2.svg"
          alt="WhatsApp"
          width={50}
          height={50}
          priority
          className="cursor-pointer"
        />
      </motion.button>
    </motion.div>
  );
}
