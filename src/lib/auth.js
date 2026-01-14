import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {},
        password: {},
        gymId: {},
        memberId: {},
      },
      async authorize(credentials) {
        const { phone, password, gymId, memberId } = credentials;

        // MEMBER LOGIN
        if (gymId && memberId) {
          const user = await User.findOne({
            phone,
            gymId,
            memberId,
            role: "user",
          });

          if (!user) return null;

          return {
            id: user._id.toString(),
            role: user.role,
            gymId: user.gymId,
            memberId: user.memberId,
          };
        }

        // ADMIN / MANAGER LOGIN
        const user = await User.findOne({ phone });
        if (!user || user.role === "user") return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          role: user.role,
          gymId: user.gymId,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.gymId = user.gymId;
        token.memberId = user.memberId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.gymId = token.gymId;
      session.user.memberId = token.memberId;
      session.user.id = token.sub;
      return session;
    },
  },
};
