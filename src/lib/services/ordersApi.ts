import axiosInstance from "./axios";

export const payWithStripeIntent = async (payload) => {
  try {
    const response = await axiosInstance.post("create-payment-intent", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
