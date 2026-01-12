// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import Plan from "@/models/Plan";
// import Membership from "@/models/Membership";
// export async function POST(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     if (!["admin", "manager"].includes(session.user.role)) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     const { name, phone, planId, startDate } = await req.json();

//     if (!name || !phone || !planId || !startDate) {
//       return NextResponse.json({ message: "Missing fields" }, { status: 400 });
//     }

//     const plan = await Plan.findById(planId);
//     if (!plan) {
//       return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
//     }
//     // 1️⃣ Create user
//     const user = await User.create({
//       name,
//       phone,
//       role: "user",
//       gymId: session.user.gymId,
//       password: "TEMP_PASSWORD", // later OTP / reset
//     });

//     // 2️⃣ Calculate expiry
//     const start = new Date(startDate);
//     const end = new Date(start);
//     end.setDate(end.getDate() + plan.durationDays);

//     // 3️⃣ Create membership
//     await Membership.create({
//       userId: user._id,
//       planId: plan._id,
//       gymId: session.user.gymId,
//       startDate: start,
//       endDate: end,
//     });
//     return NextResponse.json(
//       { message: "Member added successfully" },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
