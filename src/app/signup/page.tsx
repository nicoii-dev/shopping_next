"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { setCookie } from "cookies-next";
import { Navbar } from "@/components/navbar";
import SignupForm from "@/components/auth/signup-form";

const SignupPage = () => {
  const router = useRouter();
  const session = useSession();

  const getProfileCallBack = useCallback(() => {
    setCookie("accessToken", session.data?.token.accessToken);
    if (session.status === "authenticated") router.push("/products");
  }, [router, session.data?.token.accessToken, session.status]);

  useEffect(() => {
    getProfileCallBack();
  }, [getProfileCallBack]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SignupForm />;
    </div>
  )
};

export default SignupPage;
