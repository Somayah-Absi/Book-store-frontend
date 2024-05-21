import { configureStore } from "@reduxjs/toolkit"
import ProductSlice from "./ProductSlice"
import UserSlice from "./UserSlice"

export const store = configureStore({
  reducer: {
    productR: ProductSlice,
    userR: UserSlice
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
