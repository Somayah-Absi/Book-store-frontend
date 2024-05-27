import { configureStore } from "@reduxjs/toolkit"
import ProductSlice from "./ProductSlice"
import UserSlice from "./UserSlice"
import CategorySlice from "./CategorySlice"
import CartSlice from "./CartSlice"

export const store = configureStore({
  reducer: {
    productR: ProductSlice,
    userR: UserSlice,
    categoryR: CategorySlice,
    cartR:CartSlice
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
