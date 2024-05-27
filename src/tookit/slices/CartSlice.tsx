import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {  Product } from "@/types"
import api from "@/api"
import { getLocalStorage, setLocalStorage } from "@/LocalStorage"
import { stat } from "fs"

export type CartItem = Product & { orderQuantity: number }
// Ensure the default value returned by getLocalStorage has cartItem initialized
const data = getLocalStorage("cart", { cartItem: [] })

export type CartState = {
    cartItem: CartItem[]
  }
const initialState: CartState = {
  cartItem: data.cartItem
}

const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
      addToCart: (state, action: PayloadAction<Product>) => {
        if (!state.cartItem) {
            state.cartItem = [];
          }
          
          const item = state.cartItem.find(
            (cartItem) => cartItem.productId === action.payload.productId
          );
    
     
          if (item) {
              item.orderQuantity += 1;
          } else { 
              state.cartItem.push({...action.payload, orderQuantity: 1})
          }
      
      setLocalStorage("cart", state.cartItem)
      },
      incrementQuantity: (state, action:PayloadAction<string>) => { 
        const item = state.cartItem.find(
            (cartItem) => cartItem.productId === action.payload
          );
          if (item) {
            item.orderQuantity += 1;
          } 
          setLocalStorage("cart", state.cartItem)

      }
      ,
      decrementQuantity: (state, action:PayloadAction<string>) => { 
        const item = state.cartItem.find(
            (cartItem) => cartItem.productId === action.payload
          );
          if (item && item.orderQuantity>1) {
            item.orderQuantity -= 1;
          } 
          setLocalStorage("cart", state.cartItem)

      }

      ,
    removeFromCart: (state, action:PayloadAction<string>) => {
      state.cartItem = state.cartItem.filter((cartItem) => cartItem.productId !== action.payload)
      setLocalStorage("cart", state.cartItem)
    },
    removeAllFromCart: (state) => {
      state.cartItem = []
      setLocalStorage("cart",state.cartItem)
    }
  }
})

export const { addToCart, removeFromCart, removeAllFromCart,incrementQuantity,decrementQuantity } = CartSlice.actions

export default CartSlice.reducer
