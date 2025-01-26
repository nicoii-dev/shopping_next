"use client";

// import { GithubButton } from "./github-button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";

// components
import GoogleButton from "./google-button";
import { SigninSchema } from "@/lib/yup-schema/SigninSchema";
import TextField from "../input/TextField";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export interface SigninPayload {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const {
    control,
    // setValue,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmitHandler = async (data: SigninPayload) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
      redirect: false,
    });
    if (response?.status !== 200) {
      toast.error("Incorrect username or password.");
    } else {
      toast.success("Welcome!");
    }
  };

  return (
    <div className="flex justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 h-fit mt-32">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-4 mb-2">
          <div className="mb-4">
            <TextField
              control={control}
              name={"email"}
              inputType={"text"}
              label={"Email"}
              placeholder={"Enter email"}
            />
          </div>
          <div className="mb-4">
            <TextField
              control={control}
              name={"password"}
              label={"Password"}
              placeholder={"Enter password"}
              secureTextEntry={true}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Sign in
          </button>
        </form>
        {/* <GithubButton /> */}
        <div className="flex items-center border-collapse border-red-400 pt-5 pb-5">
          <div className="border-t w-full border-gray-300 h-0"></div>
          <div className="pl-2 pr-2">OR</div>
          <div className="border-t w-full border-gray-300 h-0"></div>
        </div>
        <GoogleButton />
        <div className="flex w-full items-center justify-center mt-5 gap-2">
          <div>{"Don't have an account?"}</div>
          <Link href={"/signup"} className="font-bold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
