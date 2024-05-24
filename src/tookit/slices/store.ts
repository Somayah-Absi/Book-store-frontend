import { configureStore } from "@reduxjs/toolkit"
import ProductSlice from "./ProductSlice"
import UserSlice from "./UserSlice"
import CategorySlice from "./CategorySlice"

export const store = configureStore({
  reducer: {
    productR: ProductSlice,
    userR: UserSlice,
    categoryR :CategorySlice
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
