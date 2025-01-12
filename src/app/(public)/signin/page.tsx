"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SigninForm from "@/components/auth/signin-form";
import { setCookie } from "cookies-next";

const SigninPage = () => {
  const router = useRouter();
  const session = useSession();

  const getProfileCallBack = useCallback(() => {
    setCookie("accessToken", session.data?.token.accessToken);
    if (session.status === "authenticated") router.push("/home");
  }, [router, session.data?.token.accessToken, session.status]);

  useEffect(() => {
    getProfileCallBack();
  }, [getProfileCallBack]);

  return <SigninForm />;
};

export default SigninPage;
