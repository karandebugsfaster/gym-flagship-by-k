import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import OwnerSalesDashboard from "@/app/components/OwnerSalesDashboard";

export default async function OwnerSalesPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="p-8 text-white space-y-6">
      <h1 className="text-3xl font-bold">Sales Overview 💰</h1>

      <OwnerSalesDashboard gymId="1" />
    </div>
  );
}
