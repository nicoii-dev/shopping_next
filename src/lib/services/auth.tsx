import axiosInstance from "./axios";
import { SignupPayload } from "@/components/auth/signup-form";
import { SigninPayload } from "@/components/auth/signin-form";

export const Signin = async (payload: SigninPayload) => {
  return await axiosInstance.post("auth/login", payload);
};

export const Signup = (payload: SignupPayload) => {
  return axiosInstance.post(`/auth/register`, payload);
};
