import React from "react";
import PageReveal from "@/app/components/PageReveal";
import LoginCard from "./LoginCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Login() {
  const session = await getServerSession(authOptions);

  // ✅ If already logged in, send to correct dashboard
  if (session) {
    if (session.user.role === "user") {
      redirect("/member");
    }
    redirect("/dashboard"); // admin / manager
  }

  return (
    <>
      <PageReveal />

      <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden px-4">
        {/* Gradient blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-orange-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-red-500/30 rounded-full blur-[120px]" />

        <LoginCard />
      </div>
    </>
  );
}
