// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import LogoutButton from "../components/LogoutButton";
// import AdminManagerClient from "../components/AdminManagerClient";
// import Link from "next/link";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   // 1️⃣ Not logged in
//   if (!session) {
//     redirect("/login");
//   }

//   // 2️⃣ Logged in but no gym
//   if (!session.user.gymId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         <h1 className="text-xl font-bold">
//           No gym assigned. Please contact admin.
//         </h1>
//       </div>
//     );
//   }

//   // 3️⃣ Allowed
//   return (
//     <>
//       {session.user.role === "admin" && <AdminManagerClient />}

//       <div className="p-8 text-white">
//         <h1 className="text-3xl font-bold">Dashboard</h1>

//         <p className="mt-2 text-white/70">
//           Role: <b>{session.user.role}</b>
//         </p>

//         <p className="mt-1 text-white/70">
//           Gym ID: <b>{session.user.gymId}</b>
//         </p>
//         <LogoutButton />
//       </div>
//       {session.user.role === "admin" && (
//         <div className="mt-6">
//           <Link
//             href="/manager"
//             className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
//           >
//             Open Manager
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 1️⃣ Not logged in
  if (!session) {
    redirect("/login");
  }

  // 2️⃣ Members should NEVER be here
  if (session.user.role === "user") {
    redirect("/member");
  }

  // 3️⃣ No gym assigned
  if (!session.user.gymId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-xl font-bold">
          No gym assigned. Please contact admin.
        </h1>
      </div>
    );
  }

  // 4️⃣ Admin Dashboard
  if (session.user.role === "admin") {
    return (
      <div className="p-8 text-white space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard 👑</h1>

        <p className="text-white/70">You are the gym owner</p>

        <p className="text-white/70">
          Gym ID: <b>{session.user.gymId}</b>
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/manager"
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
          >
            Open Manager
          </Link>
        </div>

        <LogoutButton />
      </div>
    );
  }

  // 5️⃣ Manager Dashboard
  if (session.user.role === "manager") {
    return (
      <div className="p-8 text-white space-y-6">
        <h1 className="text-3xl font-bold">Manager Dashboard 🧑‍💼</h1>
        
        {/* <p className="text-white/70">Welcome {user.name}</p> */}
        <p className="text-white/70">You manage daily gym operations</p>

        <p className="text-white/70">
          Gym ID: <b>{session.user.gymId}</b>
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/manager"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Go to Manager Panel
          </Link>
        </div>

        <LogoutButton />
      </div>
    );
  }

  // fallback (should never happen)
  redirect("/login");
}
