"use client"

import { AppBar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export function AppbarClient() {

    const session = useSession();
    const router = useRouter();

    return (
    <div>
        <AppBar user={session.data?.user
        } onSignIn={signIn} onSignOut={async () => {
            await signOut();
            router.push("/api/auth/signin")
        }} />
    </div>
    );
}