import { getToken } from "@/LocalStorage"
import api from "@/api"
import { CreateProduct, Product, ProductState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}

// This action fetches products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    sortBy: string
  }) => {
    const response = await api.get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
    )
    return response.data
  }
)

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (keyword: string) => {
    const response = await api.get(`/products/search?keyword=${keyword}`)
    return response.data
  }
)

export const CreateProducts = createAsyncThunk(
  "products/createProduct",
  async (newProduct: CreateProduct) => {
    const response = await api.post(`/products`, newProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, updateProduct }: { productId: string, updateProduct: CreateProduct }) => {
    try {
      const response = await api.put(`/products/${productId}`, updateProduct, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      return response.data
    } catch (error) {
      console.error("Update Product Error:", error)
      throw error
    }
  }
)

export const DeleteProducts = createAsyncThunk(
  "products/DeleteProducts",
  async (productId: string) => {
    await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return productId;
  }
);

export const fetchProductsById = createAsyncThunk(
  "products/fetchProductsById",
  async (productId: string | undefined) => {
    const response = await api.get(`/products/${productId}`)
    return response.data
  }
)

// Cases: pending/fulfilled/rejected
const ProductSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.items
        state.totalPages = action.payload.data.totalPages
        state.isLoading = false
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data
        state.isLoading = false
      })
      .addCase(DeleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.productId !== action.payload
        )
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product.productId === updatedProduct.productId
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        } else {
          state.products.push(updatedProduct);
        }
        localStorage.setItem("products", JSON.stringify(state.products));
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.product = action.payload.data
        state.isLoading = false
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.error = "An error occurred"
          state.isLoading = false
        }
      )
  }
})

export default ProductSlice.reducer
