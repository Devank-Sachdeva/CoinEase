"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export default function () {

  const { data } = useSession();
  // const balance = 0;
  // const name = data?.user?.name;
  return <div className="text-5xl">
    <div>
      Merchant App
    </div>
    <div>
      session: {JSON.stringify(data)}
    </div>
  </div>
}