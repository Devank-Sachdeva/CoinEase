"use server"

import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../helpers/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { amount: 0, locked: 0 };
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    })
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default getBalance;