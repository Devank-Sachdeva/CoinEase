"use client"

interface AppBarProps {
    user?: {
        name?: string;
    },
    onSignIn?: () => void;
    onSignOut?: () => void;
}

export const AppBar = ({
    user,
    onSignIn,
    onSignOut
} : AppBarProps ) => {
    return (
        <div className="flex justify-between px-5 py-2 border-b-2 border-slate-300 h-[10vh] items-center">
            <div className="font-bold text-3xl">
                CoinEase
            </div>
            <div className="flex">
                <button type="button" className="text-white bg-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 me-2" onClick={user ? onSignOut : onSignIn}>{user ? "Log Out" : "Login"}</button>
            </div>
        </div>
    )
}