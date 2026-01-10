"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Login from "../login/page";

const SignupCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        relative z-10
        w-full max-w-md
        rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        p-8 sm:p-10
        shadow-[0_0_60px_-15px_rgba(255,115,0,0.4)]
      "
    >
      {/* Heading */}
      <h1 className="text-3xl font-bold text-white text-center">
        Create your account
      </h1>
      <p className="text-white/60 text-center mt-2">
        Start your transformation today 💪
      </p>

      {/* Form */}
      <div className="mt-8 space-y-5">
        <Input label="Full Name" type="text" />
        <Input label="Email Address" type="email" />
        <Input label="Password" type="password" />

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="
            w-full mt-4
            py-3 rounded-2xl
            font-bold text-white cursor-pointer
            bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
            shadow-lg shadow-orange-500/30
          "
        >
          Sign Up
        </motion.button>
      </div>

      {/* Footer */}
      <p className="text-center text-white/60 text-sm mt-6">
        Already a member?
      </p>
      <Link href="/login">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex 
        mt-3 w-fit mx-auto
        py-3 rounded-2xl px-26
        border 
        font-semibold
        border-orange-400
        text-white-400
        transition
        cursor-pointer
        bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
        shadow-lg shadow-orange-500/30
        "
        >
          Login
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default SignupCard;

/* Input Component */
const Input = ({ label, type }) => {
  return (
    <div className="relative">
      <input
        type={type}
        required
        className="
          peer w-full
          bg-transparent
          border border-white/20
          rounded-xl
          px-4 pt-5 pb-2
          text-white
          outline-none
          focus:border-orange-400
        "
      />
      <label
        className="
          absolute left-4 top-3
          text-white/50 text-sm
          transition-all
          peer-focus:top-1
          peer-focus:text-xs
          peer-focus:text-orange-400
          peer-valid:top-1
          peer-valid:text-xs
        "
      >
        {label}
      </label>
    </div>
  );
};
