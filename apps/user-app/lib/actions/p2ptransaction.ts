"use server"
import prisma from "@repo/database/client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/helpers/auth";


export async function doP2PTransaction(number: number, amount: number) {
    amount = amount * 100;
    const session = await getServerSession(authOptions);

    const receiver = await prisma.user.findFirst({
        where: {
            number: number.toString()
        }
    })

    if (receiver == null) {
        console.log("Receiver not found")
        return null;
    }

    const userId = Number(session?.user?.id);
    if (userId == null){
        console.log("User not found")
        return null;  
    } 

    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
        const sender = await tx.balance.findFirst({
            where: {
                userId: userId
            }
        })

        if (sender == null) {
            console.log("Sender not found")
            return null;
        }

        if (sender.amount < amount) {
            console.log("Insufficient balance")
            return null;
        }

        await tx.balance.update({
            where: {
                userId: userId
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })
        await tx.balance.update({
            where: {
                userId: receiver.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        })
        
        await tx.p2PTransactions.create({
            data: {
                amount: amount,
                senderId: userId,
                receiverId: receiver.id,
                startTime: new Date()
            }
        })

        console.log("Successful Transaction")
        
    })


    console.log("Transaction successful")
}

export async function getUser(){
    const session = await getServerSession(authOptions);

    const userId = Number(session?.user?.id);
    if (userId == null){
        console.log("User not found")
        return null;  
    } 

    const user = await prisma.user.findMany({
        where: {
            NOT: {
                id: userId
            }
        }
    })

    return user.map((ele) => {
        return {
            id: ele.id,
            number: ele.number,
            name: ele.name
        }
    });
}