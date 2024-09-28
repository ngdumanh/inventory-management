"use client";
import StoreProvider from "./redux";
import { Inter } from "next/font/google";
import { useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const interClassName = useMemo(() => inter.className, []);

  return (
    <StoreProvider>
      <>
        <main className={interClassName}>HOME</main>
      </>
    </StoreProvider>
  );
}
