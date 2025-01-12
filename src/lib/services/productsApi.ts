import { getCookie } from "cookies-next";
import axiosInstance from "./axios";

export const fetchAllProducts = async () => {
  try {
    const response = await axiosInstance.get(
      `/products`
      // you can update header if you want access protected routes or use form-data
      // {
      // headers: {
      //     Accept: 'application/json',
      //     Authorization: `Bearer ${getCookie("accessToken")}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
