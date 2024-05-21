"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../helpers/auth"
import prisma from "@repo/database/client";

export async function getTransactions() {
    const session = await getServerSession(authOptions);

    if (session == null || session.user?.id == null || Number(session.user.id) == null) {
        return null;
    }

    const userId = Number(session.user.id);

    const transactions = await prisma.p2PTransactions.findMany({
        where: {
            OR: [
                {
                    senderId: userId
                },
                {
                    receiverId: userId
                }
            ]
        },
        orderBy: {
            startTime: "desc"
        }
    })

    return transactions;
}
