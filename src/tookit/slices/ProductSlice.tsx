import api from "@/api"
import { ProductState } from "@/types"
import { Action } from "@cloudinary/url-gen/internal/Action"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}
// this  action for fetching products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ pageNumber, pageSize,sortBy }: { pageNumber: number; pageSize: number;sortBy:string }) => {
    const response = await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
    return response.data
  }
)
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (keyword: string) => {
    const response = await api.get(`/products/search?keyword=${keyword}`);
    return response.data;
  }
);
export const fetchProductsById = createAsyncThunk(
  "products/fetchProductsById",
  async (ProductId: string | undefined) => {
    const response = await api.get(`/products/${ProductId}`)
    return response.data
  }
)
// cases :pending/fulfill/rejected
const ProductSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsById.fulfilled, (state, action) => {
      state.product = action.payload.data

      state.isLoading = false
    })
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),

      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),

      (state, action) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default ProductSlice.reducer
