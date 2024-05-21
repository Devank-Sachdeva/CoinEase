"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../helpers/auth"
import prisma from "@repo/database/client";


export async function createOnRampTxn (amount: number, token: string, provider: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id && Number(session?.user?.id) == null) {
        console.log("User not found")
        return null;
    }

    const userId = Number(session?.user?.id);

    const txn = await prisma.onRampTransaction.create({
        data: {
            amount: amount * 100,
            token: token,
            provider: provider,
            userId: userId,
            status: "Pending",
            startTime: new Date()
        }
    })

    return txn;


}