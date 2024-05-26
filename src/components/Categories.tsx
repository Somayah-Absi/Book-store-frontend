import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SingleCategory } from "./SingleCategory"
import { Category, CategoryForm } from "@/types" // Import the Category type
import { CreateCategory, fetchCategories } from "@/tookit/slices/CategorySlice"
import { AppDispatch, RootState } from "@/tookit/slices/store"
import { SubmitHandler, useForm } from "react-hook-form"

export const Categories = () => {
  const { categories, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.categoryR
  )
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CategoryForm>()
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(2)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize }))
    }
    fetchData()
  }, [dispatch, pageNumber, pageSize])

  const onSubmit: SubmitHandler<CategoryForm> = async (data) => {
    try {
      const response = await dispatch(CreateCategory(data))
      console.log("Form data:", response)
    } catch (error) {
      console.log("Form submission error:", error)
    }
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  return (
    <div className="category-header">
      <h1>Categories</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="form_main">
          <p className="heading">Register</p>

          <div className="inputContainer">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              {...register("categoryName", {
                required: "Category Name is required",
                minLength: {
                  value: 2,
                  message: "Category Name must be at least 2 characters"
                }
              })}
            />
            {errors.categoryName && <p className="error">{errors.categoryName.message}</p>}
          </div>
          <div className="inputContainer">
            <label htmlFor="categorySlug">Category slug</label>
            <input
              type="text"
              {...register("categorySlug", {
                required: "categorySlug is required",
                minLength: {
                  value: 2,
                  message: "categorySlug must be at least 2 characters"
                }
              })}
            />
            {errors.categorySlug && <p className="error">{errors.categorySlug.message}</p>}
          </div>
          <div className="inputContainer">
            <label htmlFor="categoryDescription">Category Description</label>
            <input
              type="text"
              {...register("categoryDescription", {
                required: "Category Description is required",
                minLength: {
                  value: 2,
                  message: "Category Description must be at least 2 characters"
                }
              })}
            />
            {errors.categoryDescription && (
              <p className="error">{errors.categoryDescription.message}</p>
            )}
          </div>

          <button id="button">Submit</button>
        </form>
      </div>
      <div className="categories-container">
        {isLoading && <p>Loading ...</p>}
        {error && <p>Error: {error}</p>}
        {categories && categories.length > 0
          ? categories.map((category) => (
              <SingleCategory key={category.categoryId} category={category} />
            ))
          : !isLoading && <p>No categories found.</p>}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPageNumber(index + 1)}
            className={pageNumber === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
