import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/database/client";

export const authOptions : AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",


        }),
    ],
    callbacks: {
        async signIn({user, account}) {
            if (!user || !user.email || !account) {
                return false;
            }

            await prisma.merchant.upsert({
                where: {
                    email: user.email,
                },
                select: {
                    id: true,
                },
                create: {
                    email: user.email,
                    name: user.name,
                    provider_id: user.id,
                    auth_type: account.provider === "google" ? "Google" : "Github",
                    
                },
                update: {
                    name: user.name,
                    auth_type: account.provider === "google" ? "Google" : "Github",
                }
            });
            
            return true;
        },
        async session({session, token} : { session : Session, token : JWT}){
            if (session.user) session.user.id = token.sub;
            return session;
        },
    }
};
