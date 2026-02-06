import { auth } from "@clerk/nextjs/server";
import { HomePage } from "@/components/pages/HomePage";
import './globals.css'
export default async function Home() {
  const { userId } = await auth();
  return <HomePage userId={userId} />;
}
