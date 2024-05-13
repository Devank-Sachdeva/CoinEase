import { authOptions } from "@/lib/helpers/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return NextResponse.json({ session});
    }
    return NextResponse.json({ msg: "Not logged in" }, { status: 401 });
};
