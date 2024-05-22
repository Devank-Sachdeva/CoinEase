import P2PComponent from "@/components/p2pComponent";
import { doP2PTransaction, getUser } from "../../../lib/actions/p2ptransaction";
import { getTransactions } from "@/lib/actions/getTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/helpers/auth";
import P2PTransaction from "@/components/P2PTransaction";
import { useTransactions } from "@repo/store/useTransactions"

export default async function P2P() {
	const users = await getUser();
	// getTransactions().then((res) => {
	// 	useTransactions().setTransactions(res ?? []);
	// });

	const session = await getServerSession(authOptions);
	return (
		<div className="grid grid-cols-2 w-full">
			<div className="p-5">
				<P2PComponent doP2PTransaction={doP2PTransaction} userList={users} />
			</div>
			<P2PTransaction userId={Number(session?.user?.id)} />
		</div>
	);
}

