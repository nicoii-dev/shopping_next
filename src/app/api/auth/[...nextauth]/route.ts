import NextAuth, {
  DefaultSession,
  ISODateString,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import axiosInstance from "@/lib/services/axios";
import { Signin } from "@/lib/services/auth";

declare module "next-auth" {
  // * modify Session interface to remove `user` in the session data
  interface Session extends Omit<DefaultSession, "user"> {
    expires: ISODateString;
    token: {
      accessToken: string | null;
      refreshToken: string | null;
    };
  }

  // * modify User interface
  interface User {
    id?: string | number | null;
    token: {
      accessToken: string | null;
      refreshToken: string | null;
    };
    user?: any;
  }
}

let userObject = {};

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Call your Laravel API to verify user credentials
        try {
          const response = await Signin({
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          });
          // const response = await axiosInstance.post("/auth/login", {
          //   email: credentials?.email,
          //   password: credentials?.password,
          // });
          if (response.data) {
            // Return user object on success
            return response.data;
          }

          // Handle specific API errors
          throw new Error(response.data.message || "Invalid credentials");
        } catch (error) {
          // Propagate the error
          throw new Error(error.message || "An unexpected error occurred");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      id: "google",
      name: "Google",
      // to always display account selection when signup
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      id: "github",
      name: "Github",
      
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google" || account.provider === "github") {
        try {
          const { email, given_name, family_name } = profile;

          const response = await axiosInstance.post("auth/oauth-login", {
            first_name: given_name,
            last_name: family_name,
            email: email,
          });
          userObject = response.data;
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      userObject = {};
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return { ...session };
      }
      // updating session object from reponse line 98
      const newUser = {
        ...user,
        ...userObject,
      };

      if (user) {
        token.id = newUser.id;
        token.accessToken = newUser.accessToken;
        token.user = newUser.user;
      }
      return token;
    },
    session: ({ session, token, user }) => ({
      ...session,
      token,
      user,
    }),
  },
  pages: {
    signIn: "/signin",
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
