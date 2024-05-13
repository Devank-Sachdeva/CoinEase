import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            name?: string;
            token?: string;
            email?: string;
            backchodi: string;
        };
    }
}
