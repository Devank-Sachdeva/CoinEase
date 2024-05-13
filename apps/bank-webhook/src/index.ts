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
        prisma.$transaction([
            prisma.balance.update({
                where: {
                    id: data.userId,
                },
                data: {
                    amount: {
                        increment: data.amount,
                    },
                },
            }),

            prisma.onRampTransaction.update({
                where: {
                    token: data.token,
                },
                data: {
                    status: "Success",
                },
            }),
        ]);

		res.status(200).json({ message: "Success" });
    } catch (error) {
		console.log(error)
		res.status(418).json({ error: "Error while processing webhook" });
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
