import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }, // admin/manager only
        gymId: { label: "Gym ID", type: "text" }, // member only
        memberId: { label: "Member ID", type: "text" }, // member only
      },

      async authorize(credentials) {
        await connectDB();

        const { phone, password, gymId, memberId } = credentials;

        if (!phone) {
          throw new Error("Phone is required");
        }

        // 🔹 CASE 1: ADMIN / MANAGER LOGIN (password-based)
        if (password) {
          const user = await User.findOne({ phone });

          if (!user) {
            throw new Error("User not found");
          }

          if (!["admin", "manager"].includes(user.role)) {
            throw new Error("Not allowed to login here");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            phone: user.phone,
            role: user.role,
            gymId: user.gymId?.toString(),
          };
        }

        // 🔹 CASE 2: MEMBER LOGIN (ID-based, no password)
        if (gymId && memberId) {
          const user = await User.findOne({
            phone,
            gymId,
            memberId,
            role: "user",
          });

          if (!user) {
            throw new Error("Invalid member details");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            phone: user.phone,
            role: user.role, // "user"
            gymId: user.gymId.toString(),
          };
        }

        // ❌ If neither flow matched
        throw new Error("Invalid login method");
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.gymId = user.gymId;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.gymId = token.gymId;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
