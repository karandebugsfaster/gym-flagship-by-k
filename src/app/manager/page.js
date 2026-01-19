// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import ManagerTotalMembers from "./ManagerTotalMembers";
// import AdminManagerClient from "../components/AdminManagerClient";
// import ManagerPlanBox from "../components/ManagerPlanBox";
// import MainManagerDashboard from "../components/MainManagerDashboard";
// import ManagerExpiredBox from "../components/ManagerExpiredBox";
// import ManagerEnquiryButton from "./ManagerEnquiryButton";
// import ManagerExpiringSoonButton from "./ManagerExpiringSoonButton";

// export default async function ManagerPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) redirect("/login");

//   if (!["admin", "manager"].includes(session.user.role)) {
//     redirect("/dashboard");
//   }

//   return (
//     <div className="p-8 text-white space-y-6">
//       {/* Welcome */}
//       <div>
//         <h1 className="text-3xl font-bold">Welcome, {session.user.name} 👋</h1>
//         <p className="text-white/60">
//           Role: {session.user.role === "admin" ? "Gym Owner" : "Manager"}
//         </p>
//       </div>

//       {/* Client workspace */}
//       <ManagerTotalMembers />
//       {/* Admin-only */}
//       <AdminManagerClient />
//       {/* Plans */}
//       <ManagerPlanBox />
//       {/* Expired Members */}
//       <ManagerExpiredBox />
//       {/* Expiring Soon Members */}
//       <ManagerExpiringSoonButton />
//       {/* Enquiries */}
//       <ManagerEnquiryButton />
//       {/* Manager Main Dashboard */}
//       <MainManagerDashboard />
//     </div>
//   );
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import ManagerTotalMembers from "./ManagerTotalMembers";
import AdminManagerClient from "../components/AdminManagerClient";
import ManagerPlanBox from "../components/ManagerPlanBox";
import ManagerExpiredBox from "../components/ManagerExpiredBox";
import ManagerEnquiryButton from "./ManagerEnquiryButton";
import ManagerExpiringSoonButton from "./ManagerExpiringSoonButton";
import MainManagerDashboard from "../components/MainManagerDashboard";

export default async function ManagerPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (!["admin", "manager"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="min-h-screen px-4 py-6 sm:px-6 space-y-10">
        {/* 🔝 WELCOME */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome, {session.user.name} 👋
          </h1>
          <p className="text-sm text-white/60">
            {session.user.role === "admin"
              ? "Gym Owner Command Center"
              : "Manager Command Center"}
          </p>
        </div>
              
        {/* 💎 MASTER KPI / ACTION BOX */}
        <div
          className="
          relative
          rounded-3xl
          p-5 sm:p-6
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_60px_rgba(255,255,255,0.05)]
          space-y-6
        "
        >
          {/* 🔥 BOX TITLE */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-wide">📊 Gym Overview</h2>
            <span className="text-xs text-white/50">Live status</span>
          </div>

          {/* KPI ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ManagerTotalMembers />
            <ManagerPlanBox />
          </div>

          {/* ALERT ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ManagerExpiredBox />
            <ManagerExpiringSoonButton />
          </div>

          {/* ACTION ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ManagerEnquiryButton />
            <AdminManagerClient />
          </div>
        </div>

        {/* 📈 MAIN ANALYTICS DASHBOARD */}
        <div>
          <MainManagerDashboard />
        </div>
      </div>
    </>
  );
}
