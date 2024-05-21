"use client"

import { getTransactions } from "@/lib/actions/getTransactions";
import { useTransactions } from "@repo/store/useTransactions";
import { Card } from "@repo/ui/card";
import { useEffect } from "react";

type TransactionUIProps = {
    received: boolean;
    amount: number;
    startTime: Date;
}

export default function P2PTransaction({ userId }: { userId: number }) {
    const { TransactionsValue, setTransactions } = useTransactions();
    useEffect(() => {
        getTransactions().then((res) => {
            setTransactions(res ?? [])
        });
    }, [])

    return (
        <div className="p-5">
            <Card title="Recent Transactions">
                {TransactionsValue.length == null ? <div className="text-center py-8">No Recent Transactions</div> :
                    <div>
                        {TransactionsValue!.map((t) => <TransactionUI key={t.id} amount={t.amount} startTime={t.startTime} received={
                            (userId === t.receiverId ? true : false)
                        } />)}
                    </div>
                }
            </Card>
        </div>
    )
}

function TransactionUI({ received, amount, startTime }: TransactionUIProps) {
    return (
        <div className="pb-2">
            <div className="flex justify-between">
                <div className="pt-2">
                    <div className={`text-sm ${received ? "text-green-500" : "text-red-600"}`}>
                        {received ? "Received" : "Sent"} INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {startTime.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {received ? "+" : "-"} Rs {(amount / 100).toLocaleString()}
                </div>

            </div>
        </div>
    )
}