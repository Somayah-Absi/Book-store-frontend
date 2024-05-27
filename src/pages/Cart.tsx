import useCartState from "@/components/hooks/useCartState"
import PageTitle from "@/components/layout/PageTitle"
import {
  decrementQuantity,
  incrementQuantity,
  removeAllFromCart,
  removeFromCart
} from "@/tookit/slices/CartSlice"
import { AppDispatch } from "@/tookit/slices/store"
import { useDispatch } from "react-redux"

export const Cart = () => {
  const { cartItem } = useCartState()
  const dispatch: AppDispatch = useDispatch()
  const handleRemoveALLItemsInCart = () => {
    dispatch(removeAllFromCart())
  }
  const handleRemoveItem = (productId?: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }
  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

  const handleIncrement = (productId?: string) => {
    if (productId) {
      dispatch(incrementQuantity(productId))
    }
  }
  const handleDecrement = (productId?: string) => {
    if (productId) {
      dispatch(decrementQuantity(productId))
    }
  }
  const cartTotal = () => {
    let total = 0
    cartItem &&
      cartItem.map((cartItem) => (total += cartItem.productPrice * cartItem.orderQuantity))
    return formatPrice(total)
  }
  return (
    <div>
      <PageTitle title="Cart" />

      {cartItem && cartItem.length > 0 ? (
        <>
          <div className="cart-heading">
            <h2>shopping cart [{cartItem.length}] items</h2>
            <button className="remove-all" onClick={handleRemoveALLItemsInCart}>
              remove all products
            </button>
          </div>

          <div className="cart-body">
            <div className="cart-items">
              {cartItem.map((cartItem) => (
                <div className="cart-item" key={cartItem.productId}>
                  <div className="cart-item-left">
                    <img src={cartItem.productImage} alt={cartItem.productName} />
                  </div>
                  <div className="cart-item-center">
                    <p>{cartItem.productName}</p>
                    <p>Description: {cartItem.productDescription}</p>
                    <p>Price: {formatPrice(cartItem.productPrice)}</p>
                    <p>Quantity in Stock: {cartItem.productQuantityInStock}</p>
                  </div>
                  <div className="cart-item-right">
                    <div className="quantity-control">
                      <button
                        className="delete-item"
                        onClick={() => {
                          handleDecrement(cartItem.productId)
                        }}
                      >
                        -
                      </button>
                      <span>{cartItem.orderQuantity}</span>
                      <button
                        className="add-item"
                        onClick={() => {
                          handleIncrement(cartItem.productId)
                        }}
                        disabled={cartItem.productQuantityInStock === cartItem.orderQuantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="add-item"
                      onClick={() => {
                        handleRemoveItem(cartItem.productId)
                      }}
                    >
                      <i className="fas fa-trash-alt">remove</i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>cart Summary</h2>
              <h3>Total you have to bay:{cartTotal()}</h3>
            </div>
          </div>
        </>
      ) : (
        <p>no item</p>
      )}
    </div>
  )
}
