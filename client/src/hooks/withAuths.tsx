"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
