"use client";

// import { GithubButton } from "./github-button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { Loader } from "rizzui/loader";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// components
import GoogleButton from "./google-button";
import { SignupSchema } from "@/lib/yup-schema/SignupSchema";
import TextField from "../input/TextField";

import { Signup } from "@/lib/services/auth";


export interface SignupPayload {
  first_name: string;
  last_name: string;
  dob: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignupForm: React.FC = () => {
  const {
    control,
    // setValue,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dob: "",
      phone_number: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Mutations
  const signupMutation = useMutation({
    mutationFn: Signup,
    onSuccess: () => {
      toast.success("Account successfully created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (error: AxiosError) => {
    toast.error(error.response?.data?.message ?? "");
    },
  });

  const onSubmitHandler = async (data: SignupPayload) => {
    await signupMutation.mutate(data);
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 h-fit mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-4 mb-2">
          <div className="mb-4 flex justify-between gap-2">
            <TextField
              control={control}
              name={"first_name"}
              inputType={"text"}
              label={"First name"}
              placeholder={"Enter first name"}
            />
            <TextField
              control={control}
              name={"last_name"}
              inputType={"text"}
              label={"Last name"}
              placeholder={"Enter last name"}
            />
          </div>
          <div className="mb-4 flex justify-between gap-2">
            <TextField
              control={control}
              name={"phone_number"}
              inputType={"number"}
              label={"Phone number"}
              placeholder={"Enter phone number"}
            />
            <TextField
              control={control}
              name={"dob"}
              inputType={"date"}
              label={"Birthday"}
              placeholder={"Enter birthday"}
            />
          </div>
          <div className="mb-4">
            <TextField
              control={control}
              name={"email"}
              inputType={"email"}
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
          <div className="mb-4">
            <TextField
              control={control}
              name={"password_confirmation"}
              label={"Confirm password"}
              placeholder={"Enter password"}
              secureTextEntry={true}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            {signupMutation.isPending ? (
              <Loader variant="spinner" className="place-self-center"/>
            ) : (
              "Sign up"
            )}
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
          <div>Have an account?</div>
          <Link href={"/signin"} className="font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
