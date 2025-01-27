import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts } from "@/lib/services/productsApi";
import { PaginationInterface } from "@/lib/services/paginationInterface";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: "",
};

export const getProducts = createAsyncThunk(
  "getProducts",
  async ({ page, per_page, search }: PaginationInterface) => {
    const response = await fetchAllProducts({ page, per_page, search });
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    setProduct: (state, action) => {
      return {
        ...state,
        product: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      });
  },
});

export const { setProducts, setProduct } = productsSlice.actions;
export default productsSlice.reducer;
