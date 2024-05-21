import prisma from "@repo/database/client";
import { paymentSchema } from "./types/paymentTypes";
import express from "express";

const app = express();
const port = 3003;

app.use(express.json());

app.post("/hdfcwebhook", async (req, res) => {
	const { data, success, error } = paymentSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({ error: error });
	}

	try {
		const txn = await prisma.$transaction(async (tx) => {

			const onRampTxn = await tx.onRampTransaction.update({
				where: {
					token: data.token,
					amount: data.amount,
					status: "Pending"
				},
				data: {
					status: "Success",
				},
			});
			if (!onRampTxn) {
				throw new Error("Invalid transaction");
			}

			await tx.balance.update({
				where: {
					userId: data.userId,
				},
				data: {
					amount: {
						increment: data.amount,
					},
				},
			})


		});

		res.status(200).json({ message: "Success", txn });
	} catch (error) {
		console.log(error)
		res.status(418).json({ error: "Error while processing webhook" });
	}
});
app.get("/", (req, res) => {
	res.send("Hello World")
})
app.get("/new1", (req, res) => {
	res.send("Hello World")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
