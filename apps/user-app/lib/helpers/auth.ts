import prisma from "@repo/database/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { AuthOptions, Session } from "next-auth";
import { userSignInSchema } from "../types/signinTypes";

type CredentialsType = Record<"username" | "password", string> | undefined;

export const authOptions : AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: CredentialsType) {
                const user = userSignInSchema.safeParse(credentials);

                if (!user.success) {
                    return null;
                }
                const hashedPassword = await bcrypt.hash(
                    user.data.password,
                    10
                );
                const dbUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: user.data.username },
                            { number: user.data.username },
                        ]
                    },
                });

                if (dbUser) {
                    const passwordMatch = await bcrypt.compare(
                        user.data.password,
                        dbUser.password
                    );

                    if (passwordMatch) {
                        return {
                            id: dbUser.id.toString(),
                            email: dbUser.email,
                            name: dbUser.name,
                        };
                    }
                }

                try {
                    prisma.$transaction(async (tx) => {
                        const newUser = await tx.user.create({
                            data: {
                                email: user.data.username,
                                password: hashedPassword,
                                number: String(
                                    Math.floor(Math.random() * 10000000000)
                                )
                            },
                        });

                        await tx.balance.create({
                            data: {
                                amount: 0,
                                userId: newUser.id,
                                locked: 0
                            },
                        
                        })
    
                        return {
                            id: newUser.id.toString(),
                            email: newUser.email,
                            name: newUser.name,
                        };
                    })
                } catch (e) {
                    console.log(e);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ token, session }: { token: JWT; session: Session }) {
            if (session.user){
                session.user.id = token.sub;
            }
            return session;
        },
    },
};
