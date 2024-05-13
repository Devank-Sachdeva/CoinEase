import { authOptions } from "@/app/lib/auth";
import nextAuth from "next-auth/next";


const handler = nextAuth(authOptions);

export { handler as GET, handler as POST}