"use client";

import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
export default function HomePage() {
  const session = useSession();
  console.log(getCookie("token"));
  console.log(session);
  return (
    <h1 className="flex justify-center items-center min-h-screen bg-slate-200">
      Home page
    </h1>
  );
}
