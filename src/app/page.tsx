"use client";

import { ProductsList } from "@/components/products/products-list";
import { Navbar } from "@/components/navbar";
import { useSession } from "next-auth/react";
// import { auth } from "@/lib/config/auth/auth";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <Navbar />
      <ProductsList />
    </div>
  );
}
