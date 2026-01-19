// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import LogoutButton from "../components/LogoutButton";
// import Link from "next/link";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   // ❌ NOT LOGGED IN
//   if (!session) {
//     redirect("/login");
//   }

//   const { role, gymId } = session.user;

//   // ❌ MEMBER SHOULD NEVER ACCESS DASHBOARD
//   if (role === "user") {
//     redirect("/member");
//   }

//   // ❌ NO GYM ASSIGNED (admin / manager misconfigured)
//   if (!gymId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         <h1 className="text-xl font-bold">
//           No gym assigned. Please contact admin.
//         </h1>
//       </div>
//     );
//   }

//   // 👑 ADMIN DASHBOARD
//   if (role === "admin") {
//     return (
//       <div className="p-8 text-white space-y-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard 👑</h1>

//         <p className="text-white/70">You are the gym owner</p>

//         <p className="text-white/70">
//           Gym ID: <b>{gymId}</b>
//         </p>

//         <div className="flex gap-4 mt-6">
//           <Link
//             href="/manager"
//             className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
//           >
//             Open Manager
//           </Link>

//           <Link
//             href="/owner/sales"
//             className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
//           >
//             Open Sales
//           </Link>
//         </div>

//         <LogoutButton />
//       </div>
//     );
//   }

//   // 🧑‍💼 MANAGER DASHBOARD
//   if (role === "manager") {
//     return (
//       <div className="p-8 text-white space-y-6">
//         <h1 className="text-3xl font-bold">Manager Dashboard 🧑‍💼</h1>

//         <p className="text-white/70">You manage daily gym operations</p>

//         <p className="text-white/70">
//           Gym ID: <b>{gymId}</b>
//         </p>

//         <div className="flex gap-4 mt-6">
//           <Link
//             href="/manager"
//             className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
//           >
//             Go to Manager Panel
//           </Link>
//         </div>

//         <LogoutButton />
//       </div>
//     );
//   }

//   // 🚨 FALLBACK (SHOULD NEVER HIT)
//   redirect("/login");
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { role, gymId, name } = session.user;

  if (role === "user") redirect("/member");

  if (!gymId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-6">
          <h1 className="text-lg font-bold">No gym assigned. Contact admin.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-6 space-y-10 max-w-5xl mx-auto">
      {/* ======================
          HERO
      ====================== */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold">
          {role === "admin" ? "Admin Dashboard 👑" : "Manager Dashboard 🧑‍💼"}
        </h1>
        <p className="text-muted">
          Welcome back{name ? `, ${name}` : ""}. This is your control center.
        </p>
      </div>

      {/* ======================
          IDENTITY CARD
      ====================== */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted">Role</p>
            <p className="font-semibold text-lg">
              {role === "admin" ? "Gym Owner" : "Manager"}
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-white/10">
            Live
          </span>
        </div>

        <div>
          <p className="text-muted">Gym ID</p>
          <p className="font-mono text-sm break-all opacity-80">{gymId}</p>
        </div>
      </div>

      {/* ======================
          QUICK ACTIONS
      ====================== */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-muted">
          Quick Actions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {role === "admin" && (
            <>
              <Link
                href="/manager"
                className="glass-card glass-blue p-5 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-lg">Manager Panel</p>
                  <p className="text-muted text-sm">
                    Members, plans, enquiries
                  </p>
                </div>
                <span className="text-2xl">🏋️</span>
              </Link>

              <Link
                href="/owner/sales"
                className="glass-card glass-purple p-5 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-lg">Sales & Profit</p>
                  <p className="text-muted text-sm">
                    Revenue, expenses, history
                  </p>
                </div>
                <span className="text-2xl">💰</span>
              </Link>
            </>
          )}

          {role === "manager" && (
            <Link
              href="/manager"
              className="glass-card glass-blue p-5 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-lg">Go to Manager Panel</p>
                <p className="text-muted text-sm">Daily gym operations</p>
              </div>
              <span className="text-2xl">📋</span>
            </Link>
          )}
        </div>
      </div>

      {/* ======================
          LOGOUT
      ====================== */}
      <div className="pt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import LogoutButton from "../components/LogoutButton";
// import Link from "next/link";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);
//   if (!session) redirect("/login");

//   const { role, gymId, name } = session.user;
//   if (role === "user") redirect("/member");

//   if (!gymId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h1 className="font-semibold">No gym assigned</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-5 space-y-6 max-w-md mx-auto">
//       {/* ================= HEADER ================= */}
//       <div className="text-center space-y-1">
//         <h1 className="text-xl font-bold">
//           {role === "admin" ? "Gym Owner" : "Manager"}
//         </h1>
//         <p className="text-xs text-gray-500">{name} · Control Center</p>
//       </div>

//       {/* ================= TODAY CARD ================= */}
//       <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
//         <div>
//           <p className="text-sm font-semibold text-purple-500">⚡ Today</p>
//           <p className="text-2xl font-bold mt-1">0</p>
//         </div>

//         <div className="text-sm text-gray-500 space-y-1">
//           <p>Online → 0</p>
//           <p>Cash → 0</p>
//         </div>
//       </div>

//       {/* ================= QUICK STATS ================= */}
//       <div className="grid grid-cols-2 gap-4 text-sm">
//         {["Admission", "Renewal", "Enquiry", "Due Paid"].map((label) => (
//           <div
//             key={label}
//             className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
//           >
//             <div>
//               <p className="font-medium">{label}</p>
//               <p className="text-xs text-gray-400">Today</p>
//             </div>
//             <p className="text-lg font-bold text-purple-500">0</p>
//           </div>
//         ))}
//       </div>

//       {/* ================= STATUS CARDS ================= */}
//       <div className="grid grid-cols-3 gap-3 text-center">
//         <StatusCard label="Due Members" color="purple" />
//         <StatusCard label="Expiring Today" color="green" />
//         <StatusCard label="Attendance" color="blue" />
//       </div>

//       {/* ================= ACTION BUTTONS ================= */}
//       <div className="grid grid-cols-2 gap-4">
//         <Link
//           href="/manager"
//           className="bg-purple-100 text-purple-700 rounded-xl py-3 text-center font-semibold"
//         >
//           Open Manager
//         </Link>

//         {role === "admin" && (
//           <Link
//             href="/owner/sales"
//             className="bg-purple-100 text-purple-700 rounded-xl py-3 text-center font-semibold"
//           >
//             Open Finance
//           </Link>
//         )}
//       </div>

//       {/* ================= LOGOUT ================= */}
//       <div className="pt-2">
//         <LogoutButton />
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENT ================= */

// function StatusCard({ label, color }) {
//   const colors = {
//     purple: "bg-purple-50 text-purple-700",
//     green: "bg-green-50 text-green-700",
//     blue: "bg-blue-50 text-blue-700",
//   };

//   return (
//     <div className={`rounded-2xl p-4 ${colors[color]}`}>
//       <p className="text-xl font-bold">0</p>
//       <p className="text-xs mt-1">{label}</p>
//     </div>
//   );
// }
