import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Plan from "@/models/Plan";

export async function POST(req) {
  await connectDB();
  //   console.log("SESSION 👉", session);

  const session = await getServerSession(authOptions);

  // 1️⃣ Auth check
  //   if (
  //     process.env.NODE_ENV !== "development" &&
  //     (!session || !["admin", "manager"].includes(session.user.role))
  //   ) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  if (
    process.env.NODE_ENV !== "development" &&
    (!session || !["admin", "manager"].includes(session.user.role))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Read body
  const { name, price, duration, durationType, gymId } = await req.json();

  // 3️⃣ Validation
  if (!name || !price || !duration || !durationType || !gymId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // 4️⃣ Convert duration → days
  let durationDays;
  if (durationType === "months") {
    durationDays = duration * 30;
  } else {
    durationDays = duration;
  }

  // 5️⃣ Prevent duplicate plan per gym
  const existingPlan = await Plan.findOne({ name, gymId });
  if (existingPlan) {
    return NextResponse.json(
      { error: "Plan already exists for this gym" },
      { status: 409 }
    );
  }

  // 6️⃣ Create plan
  const plan = await Plan.create({
    name,
    price,
    durationDays,
    gymId,
  });

  // 7️⃣ Success response
  return NextResponse.json({
    plan: {
      id: plan._id,
    },
  });
}
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Plan from "@/models/Plan";

// export async function POST(req) {
//   await connectDB();

//   const body = await req.json();

//   const plan = await Plan.create({
//     name: body.name,
//     price: body.price,
//     durationDays: 180,
//     gymId: "1",
//   });

//   return NextResponse.json({ plan });
// }
