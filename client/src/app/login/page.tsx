"use client";

import React, { useState, useEffect } from "react";
import { useLoginMutation } from "@/state/api";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import StoreProvider from "@/app/redux";
import withAuth from "@/hooks/withAuths";

const LoginPage = () => (
  <StoreProvider>
    <LoginLayout />
  </StoreProvider>
);

const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Checking for token...");
    const token = Cookies.get("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const onLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      console.log("Login successful:", result);
      // Handle successful login, e.g., redirect to another page or store the token
      Cookies.set("token", result.token, { expires: 7, secure: true });
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login failed:", err);
      // Handle login failure, e.g., show an error message
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Redirect to the Dashboard page after login
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">Login</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p>Error: {"ERROR"}</p>}
      <Link href="/signup">Visit signup</Link>
    </div>
  );
};

export default withAuth(LoginPage);
