import zod from "zod"


export const userSignInSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
})


export type userSigninTypes = zod.infer<typeof userSignInSchema>;