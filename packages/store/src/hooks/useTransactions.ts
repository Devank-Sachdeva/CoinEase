import { useRecoilState, useRecoilValue } from "recoil";
import { transactionsAtom } from "../atoms/p2pTransactions";

export const useTransactions = () => {
    const [TransactionsValue, setTransactions] = useRecoilState(transactionsAtom);
    return { TransactionsValue, setTransactions };
};
