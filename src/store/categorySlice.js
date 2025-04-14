import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getCategories = createAsyncThunk(
  "category/getCaregories",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}/category`);
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.category = action.payload.categories;
    });

    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
