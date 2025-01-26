"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SigninForm from "@/components/auth/signin-form";
import { setCookie } from "cookies-next";
import { Navbar } from "@/components/navbar";

const SigninPage = () => {
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
      <SigninForm />;
    </div>
  )
};

export default SigninPage;
