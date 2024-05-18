import { AddMoney } from "@/components/AddMoney";
import { BalanceCard } from "@/components/BalanceCard";
import { OnRampTransaction } from "@/components/OnRampTransaction";
import { authOptions } from "@/lib/helpers/auth";
import { OnRampTransactionProps } from "@/lib/types/onRampTransactionType";
import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";


async function getBalance(){
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return {amount : 0, locked : 0};
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

async function getOnRampTransactions(){
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return [];
    const tnxs = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
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

export default async function(){
    const transactions = await getOnRampTransactions();
    const balance = await getBalance();
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Transfer</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div className="flex flex-col">
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-5" />
                    <OnRampTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    )
}