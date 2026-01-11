// "use client";
// import PageReveal from "@/app/components/PageReveal";
// import LoginCard from "./LoginCard";

// const Login = () => {
//   return (
//     <>
//       <PageReveal />

//       <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden px-4">

//         Gradient blobs
//         <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-orange-500/25 rounded-full blur-[120px]" />
//         <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-red-500/25 rounded-full blur-[120px]" />

//         <LoginCard />
//       </div>
//     </>
//   );
// };

// export default Login;
// yo
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    if (res.error) {
      setError("Invalid phone or password");
    } else {
      router.push("/dashboard"); // we’ll create this next
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      {error && <p>{error}</p>}
    </form>
  );
}
