"use client";

// import { loginWithGithub } from "@/lib/config/auth/actions";
import { signIn } from "next-auth/react";

export const GithubButton = () => {

  return (
    <button
      className="w-full mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      onClick={() => signIn("github")}
    >
      Sign In With Github
    </button>
  );
};
