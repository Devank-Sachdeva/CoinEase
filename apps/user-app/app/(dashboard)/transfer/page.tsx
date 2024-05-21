import { AddMoney } from "@/components/AddMoney";
import { BalanceCard } from "@/components/BalanceCard";
import { OnRampTransaction } from "@/components/OnRampTransaction";
import getBalance from "@/lib/actions/getBalance";
import getOnRampTransactions from "@/lib/actions/getOnRampTxn";

export default async function(){
    const transactions = await getOnRampTransactions();
    const balance = await getBalance();
    return (
        <div className="w-screen">
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

    return (
        <div>
            Meow
        </div>
    )
}