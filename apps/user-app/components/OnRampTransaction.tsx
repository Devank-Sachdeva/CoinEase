"use client"

import { OnRampTransactionProps } from "@/lib/types/onRampTransactionType"
import Card from "@repo/ui/card"

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
            <div className="pt-2">
                {transactions.map(t => <div className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.startTime.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {(t.amount / 100).toLocaleString()}
                    </div>

                </div>)}
            </div>
        </Card>
    )
}

// model OnRampTransaction {
//   id        Int @id @default (autoincrement())
//   status    OnRampStatus
//   token     String @unique
//   provider  String
//   amount    Int
//   startTime DateTime
//   userId    Int
//   user      User @relation(fields: [userId], references: [id])
// }