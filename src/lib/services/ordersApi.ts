import axiosInstance from "./axios";

export const payWithStripeIntent = async (payload) => {
  try {
    const response = await axiosInstance.post("create-payment-intent", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const payWithSession = async (payload) => {
  try {
    const response = await axiosInstance.post("create-checkout-session", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

