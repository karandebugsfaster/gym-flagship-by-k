// console.log("URI:", process.env.MONGODB_URI);
// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

// const SignupCard = () => {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // 1️⃣ CREATE USER
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           phone,
//           password,
//           gymId: "TEMP_GYM",
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message || "Signup failed");
//       }

//       // 2️⃣ AUTO LOGIN (NextAuth)
//       const loginRes = await signIn("credentials", {
//         redirect: false,
//         phone,
//         password,
//       });

//       if (loginRes?.error) {
//         throw new Error("Login failed after signup");
//       }

//       // 3️⃣ REDIRECT TO DASHBOARD
//       router.push("/dashboard");

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.form
//       onSubmit={handleSignup}
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
//       <h1 className="text-3xl font-bold text-white text-center">
//         Create your account
//       </h1>
//       <p className="text-white/60 text-center mt-2">
//         Start your transformation today 💪
//       </p>

//       {error && (
//         <p className="mt-4 text-center text-sm text-red-400">
//           {error}
//         </p>
//       )}

//       <div className="mt-8 space-y-5">
//         <Input label="Full Name" type="text" value={name} setValue={setName} />
//         <Input label="Phone Number" type="tel" value={phone} setValue={setPhone} />
//         <Input label="Password" type="password" value={password} setValue={setPassword} />

//         <motion.button
//           whileHover={{ scale: 1.04 }}
//           whileTap={{ scale: 0.96 }}
//           disabled={loading}
//           className="
//             w-full mt-4
//             py-3 rounded-2xl
//             font-bold text-white
//             bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
//             shadow-lg shadow-orange-500/30
//             disabled:opacity-50
//           "
//         >
//           {loading ? "Creating account..." : "Sign Up"}
//         </motion.button>
//       </div>

//       <p className="text-center text-white/60 text-sm mt-6">
//         Already a member?
//       </p>
//       <Link href="/login">
//         <motion.button
//           whileHover={{ scale: 1.04 }}
//           whileTap={{ scale: 0.96 }}
//           className="
//             mt-3 w-fit mx-auto block
//             py-3 px-8 rounded-2xl
//             font-semibold text-white
//             bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
//             shadow-lg shadow-orange-500/30
//           "
//         >
//           Login
//         </motion.button>
//       </Link>
//     </motion.form>
//   );
// };

// export default SignupCard;

// /* Input Component */
// const Input = ({ label, type, value, setValue }) => (
//   <div className="relative">
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       required
//       className="
//         peer w-full
//         bg-transparent
//         border border-white/20
//         rounded-xl
//         px-4 pt-5 pb-2
//         text-white
//         outline-none
//         focus:border-orange-400
//       "
//     />
//     <label
//       className="
//         absolute left-4 top-3
//         text-white/50 text-sm
//         transition-all
//         peer-focus:top-1
//         peer-focus:text-xs
//         peer-focus:text-orange-400
//         peer-valid:top-1
//         peer-valid:text-xs
//       "
//     >
//       {label}
//     </label>
//   </div>
// );
