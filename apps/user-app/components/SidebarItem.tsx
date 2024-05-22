"use client"
import { usePathname, useRouter } from "next/navigation";
// import {  } from "next/router";

interface SideBarProps {
    route: string;
    title: string;
    icon: React.ReactNode;
}

export default function SideBar ({route, title, icon} : SideBarProps){

    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === route;

    return <div className={`flex ${isActive ? "text-[#3f2578]" : "text-slate-500"} cursor-pointer pl-8 pb-2`} onClick={() => router.push(route)}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`${isActive ? "font-bold" : ""}`}>
            {title} 
        </div>
    </div>
}