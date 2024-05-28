import useCartState from "@/components/hooks/useCartState";
import PageTitle from "@/components/layout/PageTitle";
import {
  decrementQuantity,
  incrementQuantity,
  removeAllFromCart,
  removeFromCart
} from "@/tookit/slices/CartSlice";
import { useDispatch } from "react-redux";

export const Cart = () => {
  const { cartItem } = useCartState();
  const dispatch = useDispatch();

  const handleRemoveALLItemsInCart = () => {
    dispatch(removeAllFromCart());
  };

  const handleRemoveItem = (productId?: string) => {
    if (productId) {
      dispatch(removeFromCart(productId));
    }
  };

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  };

  const handleIncrement = (productId?: string) => {
    if (productId) {
      dispatch(incrementQuantity(productId));
    }
  };

  const handleDecrement = (productId?: string) => {
    if (productId) {
      dispatch(decrementQuantity(productId));
    }
  };

  const cartTotal = () => {
    let total = 0;
    cartItem &&
      cartItem.forEach((cartItem) => (total += cartItem.productPrice * cartItem.orderQuantity));
    return formatPrice(total);
  };

  return (
    <div className="container mx-auto py-8">
      <PageTitle title="Cart" />

      {cartItem && cartItem.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Shopping Cart ({cartItem.length} items)</h2>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleRemoveALLItemsInCart}
            >
              Remove All Products
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItem.map((cartItem) => (
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center" key={cartItem.productId}>
                <div className="flex-none w-24 h-24 mr-4">
                  <img className="w-full h-full object-cover" src={cartItem.productImage} alt={cartItem.productName} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{cartItem.productName}</h3>
                  <p className="text-gray-600">Description: {cartItem.productDescription}</p>
                  <p className="text-gray-600">Price: {formatPrice(cartItem.productPrice)}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-gray-600 border border-gray-300 px-2 py-1 rounded"
                      onClick={() => handleDecrement(cartItem.productId)}
                    >
                      -
                    </button>
                    <span>{cartItem.orderQuantity}</span>
                    <button
                      className="text-gray-600 border border-gray-300 px-2 py-1 rounded"
                      onClick={() => handleIncrement(cartItem.productId)}
                      disabled={cartItem.productQuantityInStock === cartItem.orderQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-auto"
                  onClick={() => handleRemoveItem(cartItem.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Cart Summary</h2>
            <h3 className="text-xl font-semibold">Total: {cartTotal()}</h3>
          </div>
        </>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
};
