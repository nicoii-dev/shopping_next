import axiosInstance from "./axios";
import { PaginationInterface } from "./paginationInterface";

export const fetchAllProducts = async ({page, per_page, search}: PaginationInterface) => {
  try {
    const response = await axiosInstance.get(
      `/products?page=${page}&per_page=${per_page}&search=${search}`
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
