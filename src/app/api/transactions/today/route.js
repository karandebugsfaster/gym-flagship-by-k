// // import { NextResponse } from "next/server";
// // import connectDB from "@/lib/db";
// // import Membership from "@/models/Membership";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// // export async function GET(req) {
// //   try {
// //     const session = await getServerSession(authOptions);

// //     if (
// //       process.env.NODE_ENV !== "development" &&
// //       (!session || !["admin", "manager"].includes(session.user.role))
// //     ) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     await connectDB();

// //     const { searchParams } = new URL(req.url);
// //     const gymId = searchParams.get("gymId");

// //     if (!gymId) {
// //       return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
// //     }

// //     // 🕒 Today range
// //     const startOfToday = new Date();
// //     startOfToday.setHours(0, 0, 0, 0);

// //     const endOfToday = new Date();
// //     endOfToday.setHours(23, 59, 59, 999);

// //     // 💰 Fetch today's memberships
// //     const memberships = await Membership.find({
// //       gymId,
// //       createdAt: {
// //         $gte: startOfToday,
// //         $lte: endOfToday,
// //       },
// //     })
// //       .populate("userId", "name memberId")
// //       .populate("planId", "name price")
// //       .sort({ createdAt: -1 });

// //     const transactions = memberships.map((m) => ({
// //       _id: m._id,
// //       memberName: m.userId?.name || "—",
// //       memberId: m.userId?.memberId || "—",
// //       planName: m.planId?.name || "—",
// //       amount: m.planId?.price || 0,
// //       createdAt: m.createdAt,
// //     }));

// //     return NextResponse.json({ transactions });
// //   } catch (err) {
// //     console.error("❌ TODAY TRANSACTIONS ERROR:", err);
// //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Payment from "@/models/Payment";
// import Plan from "@/models/Plan";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (
//       process.env.NODE_ENV !== "development" &&
//       (!session || !["admin", "manager"].includes(session.user.role))
//     ) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const gymId = searchParams.get("gymId");

//     if (!gymId) {
//       return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
//     }

//     /* ---------------- DATE RANGE (UTC) ---------------- */
//     const now = new Date();
//     const startOfDay = new Date(
//       Date.UTC(
//         now.getUTCFullYear(),
//         now.getUTCMonth(),
//         now.getUTCDate(),
//         0,
//         0,
//         0,
//         0,
//       ),
//     );
//     const endOfDay = new Date(
//       Date.UTC(
//         now.getUTCFullYear(),
//         now.getUTCMonth(),
//         now.getUTCDate() + 1,
//         0,
//         0,
//         0,
//         0,
//       ),
//     );

//     /* ---------------- FETCH PAYMENTS ---------------- */
//     const payments = await Payment.find({
//       gymId,
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     })
//       .populate("userId", "name memberId")
//       .populate("planId", "name")
//       .sort({ createdAt: -1 });

//     console.log("🔍 DEBUG - Transactions Query:", {
//       gymId,
//       startOfDay,
//       endOfDay,
//       paymentCount: payments.length,
//     });

//     /* ---------------- FORMAT RESPONSE ---------------- */
//     const result = payments.map((p) => ({
//       _id: p._id,
//       memberName: p.userId?.name || "Unknown",
//       memberId: p.userId?.memberId || "—",
//       planName: p.planId?.name || "—",
//       amount: p.amountPaid, // ✅ REAL MONEY
//       createdAt: p.createdAt,
//     }));

//     return NextResponse.json({ transactions: result });
//   } catch (err) {
//     console.error("❌ TODAY TRANSACTIONS ERROR:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
