import { RootState } from "@/tookit/slices/store"
import { useSelector } from "react-redux"

// Then use this custom hook in your components to access Redux state
const useCategoryState = () => {
  const { categories, isLoading, error, totalPages, category } = useSelector(
    (state: RootState) => state.categoryR
  )
  return { categories, isLoading, error, totalPages, category }
}

export default useCategoryState
