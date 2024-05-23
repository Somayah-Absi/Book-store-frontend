import { RootState } from "@/tookit/slices/store";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from 'react-redux';
import React from "react"; // Don't forget to import React

// Define a custom hook with the RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Then use this custom hook in your components to access Redux state
const useUserState = () => {
  const { userData, isLoading, error, token, isLoggedIn } = useAppSelector(
    (state: RootState) => state.userR
  );
  // Ensure that token is not null before returning
  const safeToken = token || ""; // Assign an empty string if token is null
  return { userData, isLoading, error, token: safeToken, isLoggedIn };
}

export default useUserState;
