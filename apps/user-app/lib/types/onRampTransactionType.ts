import OnRampStatus  from "@repo/database/types"

interface OnRampTransactionProps {
    id: number,
    status: OnRampStatus,
    provider: string,
    amount: number,
    startTime: Date,
}

export type { OnRampTransactionProps }