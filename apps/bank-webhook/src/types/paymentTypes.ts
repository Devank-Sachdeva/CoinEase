import zod from "zod";


export const paymentSchema = zod.object({
    token: zod.string(),
    amount: zod.number(),
    userId: zod.number(),
});

