import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api";
import { CategoryState } from "@/types";

const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  category: null,
  error: null,
  isLoading: false,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await api.get(
      `/categories?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  }
);
export const DeleteCategories = createAsyncThunk(
    "categories/DeleteCategories",
    async (categoryId:string)=>{
      const response = await api.delete(`/categories/${categoryId}`);
      return categoryId;
    }
  );
  
const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.items;
      state.totalPages = action.payload.data.totalPages;
      state.isLoading = false;
    });
      builder.addCase(DeleteCategories.fulfilled, (state, action) => {
       
          state.categories = state.categories.filter(
            (category)=>category.categoryId!==action.payload
        )
        // state.totalPages = action.payload.data.totalPages;
        // state.isLoading = false;
      });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null;
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.error = "An error occurred";
        state.isLoading = false;
      }
    );
  },
});

export default CategorySlice.reducer;
