"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerifyTokenQuery } from "../state/api"; // Adjust the import according to your project structure
import { useAppSelector } from "@/app/redux"; // Adjust the import according to your project structure

const useAuth = () => {
  //   const router = useRouter();
  //   const token = useAppSelector((state) => state.auth.token); // Assuming you have a token in your Redux state
  //   const { data, error } = useVerifyTokenQuery(undefined, {
  //     skip: !token, // Skip the query if there's no token
  //   });
  //   useEffect(() => {
  //     if (!token || error || (data && !data.isValid)) {
  //       router.push("/login");
  //     } else if (data && data.isValid) {
  //       router.push("/dashboard");
  //     }
  //   }, [token, data, error, router]);
};

export default useAuth;
