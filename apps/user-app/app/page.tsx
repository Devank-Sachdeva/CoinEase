import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function App() {
  const session = await getServerSession();
  if (session?.user){
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}