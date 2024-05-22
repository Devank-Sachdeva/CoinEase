"use client"

import { OnRampTransactionProps } from "@/lib/types/onRampTransactionType"
import { Card } from "@repo/ui/card"

export const OnRampTransaction = ( {transactions} :  {transactions : OnRampTransactionProps[] } ) => {
    if (transactions.length == 0)
    return(
        <Card title={"Recent Transactions"}>
            <div className="text-center py-8">   
                No Recent Transactions
            </div>
        </Card>
    )
    return (
        <Card title="Recent Transactions">
            <div className="pb-2">
                {transactions.map(t => <div className="flex justify-between" key={t.id}>
                    <div className="pt-2">
                        <div className={`text-sm ${t.status == "Success" ? "text-green-500" : t.status == "Pending" ? "text-amber-500" : "text-red-600"}`}>
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.startTime.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {(t.amount / 100).toLocaleString("en-US")}
                    </div>

                </div>)}
            </div>
        </Card>
    )
}
