// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Signup from "../sign-up/page";

// const LoginCard = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="
//         relative z-10
//         w-full max-w-md
//         rounded-3xl
//         bg-white/5 backdrop-blur-xl
//         border border-white/10
//         p-8 sm:p-10
//         shadow-[0_0_60px_-15px_rgba(255,115,0,0.4)]
//       "
//     >
//       {/* Heading */}
//       <h1 className="text-3xl font-bold text-white text-center">
//         Welcome back 👋
//       </h1>
//       <p className="text-white/60 text-center mt-2">
//         Log in and continue your grind 💪
//       </p>

//       {/* Form UI only */}
//       <div className="mt-8 space-y-5">
//         <Input label="Email Address" type="email" />
//         <Input label="Password" type="password" />

//         <motion.button
//           whileHover={{ scale: 1.04 }}
//           whileTap={{ scale: 0.96 }}
//           className="
//             w-full mt-4
//             py-3 rounded-2xl
//             font-bold text-white
//             bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
//             shadow-lg shadow-orange-500/30
//           "
//         >
//           Login
//         </motion.button>
//       </div>

//       {/* Footer */}
//       <p className="text-center text-white/60 text-sm mt-6">New here?</p>
//       <Link href="/sign-up">
//         <motion.button
//           whileHover={{ scale: 1.04 }}
//           whileTap={{ scale: 0.96 }}
//           className="
//         mt-3 w-fit flex mx-auto px-9
//         py-3 rounded-2xl
//         border
//         text-white font-semibold
//         border-orange-400 cursor-pointer
//         bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
//         shadow-lg shadow-orange-500/30
//         transition
//         "
//         >
//           Create Account
//         </motion.button>
//       </Link>
//     </motion.div>
//   );
// };

// export default LoginCard;

// /* Shared Input */
// const Input = ({ label, type }) => {
//   return (
//     <div className="relative">
//       <input
//         type={type}
//         required
//         className="
//           peer w-full
//           bg-transparent
//           border border-white/20
//           rounded-xl
//           px-4 pt-5 pb-2
//           text-white
//           outline-none
//           focus:border-orange-400
//         "
//       />
//       <label
//         className="
//           absolute left-4 top-3
//           text-white/50 text-sm
//           transition-all
//           peer-focus:top-1
//           peer-focus:text-xs
//           peer-focus:text-orange-400
//           peer-valid:top-1
//           peer-valid:text-xs
//         "
//       >
//         {label}
//       </label>
//     </div>
//   );
// };
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginCard = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid phone or password");
    } else {
      router.push("/dashboard");
    }
  };

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
        Welcome back 👋
      </h1>
      <p className="text-white/60 text-center mt-2">
        Log in and continue your grind 💪
      </p>

      {/* FORM */}
      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <Input
          label="Phone Number"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="
            w-full mt-4
            py-3 rounded-2xl
            font-bold text-white
            bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
            shadow-lg shadow-orange-500/30
          "
        >
          Login
        </motion.button>
      </form>

      {/* Footer */}
      <p className="text-center text-white/60 text-sm mt-6">New here?</p>
      <Link href="/sign-up">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="
            mt-3 w-fit flex mx-auto px-9
            py-3 rounded-2xl
            border 
            text-white font-semibold
            border-orange-400 cursor-pointer
            bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
            shadow-lg shadow-orange-500/30
          "
        >
          Create Account
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default LoginCard;

/* ================= INPUT ================= */

const Input = ({ label, type, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
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
