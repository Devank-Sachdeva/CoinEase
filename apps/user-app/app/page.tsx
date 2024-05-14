"use client";

import { useBalance } from "@repo/store/useBalance";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { AppBar} from "@repo/ui/appbar";




export default function () {

  const balance = useBalance();
  const { data } = useSession();
  // const balance = 0;
  const name  = data?.user?.name;
  return <div className="text-5xl">
    <AppBar />
    <div>
      hi there {balance}
    </div>
    <div>
      session: {JSON.stringify(data?.user?.id)}
    </div>
  </div>
}