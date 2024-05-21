import { atom } from "recoil";


type transactions = {
    id: number;
    senderId: number;
    receiverId: number;
    amount: number;
    startTime: Date;
};

export const transactionsAtom = atom<transactions[]>({
    key: "transactions",
    default: [],
});
