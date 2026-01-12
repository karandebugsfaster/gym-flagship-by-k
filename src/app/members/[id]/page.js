// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export default async function MemberPage({ params }) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/login");
//   }

//   if (!["admin", "manager"].includes(session.user.role)) {
//     redirect("/dashboard");
//   }

//   await connectDB();

//   const member = await User.findById(params.id);

//   if (!member || String(member.gymId) !== String(session.user.gymId)) {
//     redirect("/manager");
//   }

//   return (
//     <div className="min-h-screen p-6 text-white">
//       <h1 className="text-3xl font-bold">Member Profile</h1>

//       <div className="mt-6 space-y-3">
//         <p><b>Name:</b> {member.name}</p>
//         <p><b>Phone:</b> {member.phone}</p>
//         <p><b>Gender:</b> {member.gender}</p>
//         <p><b>Batch:</b> {member.batch}</p>
//       </div>
//     </div>
//   );
// }
// export default async function MemberPage({ params }) {
//   const { id } = await params;


//   console.log("STEP 1: Page hit");
//   console.log("PARAM ID:", params.id);

//   const session = await getServerSession(authOptions);
//   console.log("STEP 2: Session:", session?.user);

//   if (!session) {
//     console.log("STEP 3: No session → login");
//     redirect("/login");
//   }

//   console.log("STEP 4: Role:", session.user.role);

//   if (!["admin", "manager"].includes(session.user.role)) {
//     console.log("STEP 5: Role blocked");
//     redirect("/dashboard");
//   }

//   await connectDB();
//   console.log("STEP 6: DB connected");

//   const member = await User.findById(params.id);
//   console.log("STEP 7: Member:", member);

//   if (!member) {
//     console.log("STEP 8: Member not found");
//     redirect("/manager");
//   }

//   console.log("MEMBER GYM:", String(member.gymId));
//   console.log("SESSION GYM:", String(session.user.gymId));

//   if (String(member.gymId) !== String(session.user.gymId)) {
//     console.log("STEP 9: Gym mismatch");
//     redirect("/manager");
//   }

//   console.log("STEP 10: PAGE SHOULD RENDER");

//   return (
//     <div>Member OK</div>
//   );
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function MemberPage({ params }) {
  const { id } = await params; // ✅ FIX 1

  console.log("STEP 1: Page hit");
  console.log("PARAM ID:", id);

  const session = await getServerSession(authOptions); // ✅ FIX 2
  console.log("STEP 2: Session:", session?.user);

  if (!session) {
    redirect("/login");
  }

  if (!["admin", "manager"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  await connectDB();
  console.log("STEP 3: DB connected");

  const member = await User.findById(id);
  console.log("STEP 4: Member:", member);

  if (!member) {
    redirect("/manager");
  }

  if (String(member.gymId) !== String(session.user.gymId)) {
    redirect("/manager");
  }

  console.log("STEP 5: PAGE SHOULD RENDER");

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Member Profile</h1>
      <p><b>Name:</b> {member.name}</p>
      <p><b>Phone:</b> {member.phone}</p>
      <p><b>Gender:</b> {member.gender}</p>
      <p><b>Batch:</b> {member.batch}</p>
    </div>
  );
}
