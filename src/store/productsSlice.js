import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}?limit=1000`);
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });

    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default productsSlice.reducer;
