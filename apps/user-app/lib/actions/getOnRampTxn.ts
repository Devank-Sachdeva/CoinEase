"use server"

import { getServerSession } from "next-auth";
import { OnRampTransactionProps } from "../types/onRampTransactionType";
import prisma from "@repo/database/client";
import { authOptions } from "../helpers/auth";

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return [];
    const tnxs = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            startTime: "desc"
        }
    })
    return tnxs.map(tnx => ({
        id: tnx.id,
        amount: tnx.amount,
        provider: tnx.provider,
        status: tnx.status,
        startTime: tnx.startTime,
    }) as OnRampTransactionProps)

}

export default getOnRampTransactions;