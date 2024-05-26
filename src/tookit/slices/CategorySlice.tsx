import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "@/api"
import { CategoryForm, CategoryFormEdit, CategoryState } from "@/types"
import { getToken } from "@/LocalStorage"

const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  category: null,
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await api.get(`/categories?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    return response.data
  }
)
export const CreateCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: CategoryForm) => {
    const response = await api.post(`/categories`, newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)
export const DeleteCategories = createAsyncThunk(
  "categories/DeleteCategories",
  async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return categoryId
  }
)
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    updateCategory,
    categoryId
  }: {
    updateCategory: CategoryFormEdit
    categoryId: string
  }) => {
    console.log("Update User Payload:", { updateCategory, categoryId })

    try {
      const response = await api.put(`/categories/${categoryId}`, updateCategory)

      console.log("Update User Response:", response.data)
      return response.data
    } catch (error) {
      console.error("Update User Error:", error)
      throw error
    }
  }
)

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })
    builder.addCase(DeleteCategories.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.categoryId !== action.payload
      )
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
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default CategorySlice.reducer
