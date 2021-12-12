import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetCategories } from "services/api";

const fetchCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await apiGetCategories();
      return categories;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default fetchCategories;
