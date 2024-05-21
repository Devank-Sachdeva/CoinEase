"use client"

import { Card } from "@repo/ui/card"
import { InputField } from "@repo/ui/textfield"
import { Select } from "@repo/ui/selectfield";
import { useState } from "react";
import { createOnRampTxn } from "@/lib/actions/createOnRampTxn";


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];



export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    return <Card title="Add Money" >
        <div className="pt-2 h-[vw]">
            <InputField label="Amount" inputFunction={(e: string) => setAmount(Number(e))} />
            <div className="py-2 text-left">
                Bank
            </div>
            <Select options={SUPPORTED_BANKS.map(element => {
                return { key: element.name, value: element.name }
            })} onSelect={(e : string) => {
                setRedirectUrl(SUPPORTED_BANKS.find(element => element.name === e)?.redirectUrl || "");
            }} ></Select>
            <div className="flex justify-center pt-5">
                <button className="text-white bg-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 me-2" onClick={async () => {
                    await createOnRampTxn(amount, Math.random().toString(), SUPPORTED_BANKS.find(element => element.redirectUrl === redirectUrl)?.name || "Dummy Bank")
                    window.location.href = redirectUrl;
                 }}>Add Money</button>
            </div>
        </div>
    </Card>
}