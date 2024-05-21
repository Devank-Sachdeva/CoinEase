"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/selectfield";
import { InputField } from "@repo/ui/textfield"
import { useState } from "react";

export default function P2PComponent({ doP2PTransaction, userList }: {
    doP2PTransaction: Function, userList: {
        id: number,
        number: string,
        name: string | null
    }[] | null
}) {
    const [number, setNumber] = useState(0);
    const [amount, setAmount] = useState(0);

    return (
        <Card title="P2P Transactions">
            <div className="py-2 text-left">
                User
            </div>
            <Select onSelect={(e: string) => { setNumber(Number(e)) }} options={userList?.map((user) => { return { key: user.number, value: user.number } })} ></Select>
            <div className="pt-3">

            </div>
            <InputField label="Amount" inputFunction={(e: string) => { setAmount(Number(e)) }} />
            <div className="flex py-2 justify-center">
                <Button executeFunction={() => {
                    console.log("Sending")
                    doP2PTransaction(number, amount)
                    alert("Transaction Sent")
                }} > Send </Button>
            </div>
        </Card>
    )
}