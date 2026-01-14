// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { name, phone, password, gymId } = await req.json();

//     // 1️⃣ Basic validation
//     if (!name || !phone || !password || !gymId) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ Check if user already exists
//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 409 }
//       );
//     }

//     // 3️⃣ Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4️⃣ Create user
//     const user = await User.create({
//       name,
//       phone,
//       password: hashedPassword, // store HASH, not password
//       // gymId: "TEMP_GYM", // temp
//       gymId: "hans", // temp
//       role: "user", // backend decides role
//     });

//     // 5️⃣ Return success (NEVER send password)
//     return NextResponse.json(
//       {
//         message: "User created successfully",
//         user: {
//           id: user._id,
//           name: user.name,
//           phone: user.phone,
//           role: user.role,
//           gymId: user.gymId,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// console.log("MONGO URI CHECK:", process.env.MONGODB_URI);

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { name, phone, password, gymId } = await req.json();

//     if (!name || !phone || !password || !gymId) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     if (!mongoose.Types.ObjectId.isValid(gymId)) {
//       return NextResponse.json({ message: "Invalid gymId" }, { status: 400 });
//     }

//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 409 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       phone,
//       password: hashedPassword,
//       gymId,
//       role: "user",
//     });

//     return NextResponse.json(
//       {
//         message: "User created successfully",
//         user: {
//           id: user._id,
//           name: user.name,
//           phone: user.phone,
//           role: user.role,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("SIGNUP ERROR:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
