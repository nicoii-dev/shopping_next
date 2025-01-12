"use client";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const withAuth = (WrappedComponent: () => ReactNode) => {
  return function WithAuth(props: any) {
    const session = useSession();
    console.log(session)
    useEffect(() => {
      if (session.status === "unauthenticated") {
        redirect("/");
      }
    }, []);

    if (session.status === "unauthenticated") {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};