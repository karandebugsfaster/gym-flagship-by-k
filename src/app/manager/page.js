import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ManagerTotalMembers from "./ManagerTotalMembers";
import AdminManagerClient from "../components/AdminManagerClient";
import ManagerPlanBox from "../components/ManagerPlanBox";
import MainManagerDashboard from "../components/MainManagerDashboard";
import ManagerExpiredBox from "../components/ManagerExpiredBox";
import ManagerEnquiryButton from "./ManagerEnquiryButton";
import ManagerExpiringSoonButton from "./ManagerExpiringSoonButton";

export default async function ManagerPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (!["admin", "manager"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  return (
    <div className="p-8 text-white space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {session.user.name} 👋</h1>
        <p className="text-white/60">
          Role: {session.user.role === "admin" ? "Gym Owner" : "Manager"}
        </p>
      </div>

      {/* Client workspace */}
      <ManagerTotalMembers />
      {/* Admin-only */}
      <AdminManagerClient />
      {/* Plans */}
      <ManagerPlanBox />
      {/* Expired Members */}
      <ManagerExpiredBox /> 
      {/* Expiring Soon Members */}
      <ManagerExpiringSoonButton />
      {/* Enquiries */}
      <ManagerEnquiryButton />
      {/* Manager Main Dashboard */}
      <MainManagerDashboard />
    </div>
  );
}
