// "use client";

// import { useSession, signOut } from "next-auth/react";

// export default function DashboardPage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (!session) {
//     return <p>Not logged in</p>;
//   }

//   return (
//     <>
//       <div>
//         <h1>Dashboard</h1>

//         <p>Name: {session.user.name}</p>
//         <p>Phone: {session.user.phone}</p>
//         <p>Role: {session.user.role}</p>
//         <p>Gym ID: {session.user.gymId}</p>

//         <button onClick={() => signOut()}>Logout</button>
//       </div>
//       <button
//         onClick={async () => {
//           const res = await fetch("/api/gym/create", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name: "Iron Paradise" }),
//           });

//           const data = await res.json();
//           console.log(data);
//         }}
//       >
//         Create Gym
//       </button>
//     </>
//   );
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 1️⃣ Not logged in
  if (!session) {
    redirect("/login");
  }

  // 2️⃣ Logged in but no gym
  if (!session.user.gymId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-xl font-bold">
          No gym assigned. Please contact admin.
        </h1>
      </div>
    );
  }

  // 3️⃣ Allowed
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-white/70">
        Role: <b>{session.user.role}</b>
      </p>

      <p className="mt-1 text-white/70">
        Gym ID: <b>{session.user.gymId}</b>
      </p>
      <LogoutButton />
    </div>
  );
}
