import { RootState } from "@/tookit/slices/store";
import { useSelector } from "react-redux";


// Then use this custom hook in your components to access Redux state
const useCartState = () => {
  const { cartItem} = useSelector(
    (state: RootState) => state.cartR
  );
  return  { cartItem};
}

export default useCartState;
