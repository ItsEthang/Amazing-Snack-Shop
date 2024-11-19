import NextAuth from "next-auth";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
      // Add other properties as needed
    } & DefaultSession["user"];
  }
  interface User {
    isAdmin: boolean;
  }
}
