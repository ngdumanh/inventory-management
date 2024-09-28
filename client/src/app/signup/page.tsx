"use client";
import React from "react";
import Link from "next/link";

const SignupPage = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">Signup</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
        mb-4 focusoutline-none focus:ring-2 focus:ring-blue-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
        mb-4 focusoutline-none focus:ring-2 focus:ring-blue-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Signup here
      </button>
      <Link href="/login">Visit login</Link>
    </div>
  );
};
export default SignupPage;
