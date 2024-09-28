"use client";
import Dashboard from "@/app/dashboard/page";
import LoginPage from "./login/page";
import SignupPage from "./signup/page";
import StoreProvider from "./redux";
import { Inter } from "next/font/google";
import { useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const interClassName = useMemo(() => inter.className, []);

  return (
    <StoreProvider>
      <>
        <main className={interClassName}>dsadas</main>
      </>
    </StoreProvider>
  );
}

// const Home = () => (
//   <StoreProvider>
//     <div className="flex">dasdasdas</div>
//   </StoreProvider>
// );
// export default Home;
