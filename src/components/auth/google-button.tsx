"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-white text-black border px-4 py-2 rounded flex items-center w-full justify-center gap-2"
    >
      <FcGoogle size={25} />
      Sign In with Google
    </button>
  );
}
