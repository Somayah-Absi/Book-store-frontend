import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SingleCategory } from "./SingleCategory"
import { CategoryForm } from "@/types" // Import the CategoryForm type
import { CreateCategory, fetchCategories } from "@/tookit/slices/CategorySlice"
import { AppDispatch, RootState } from "@/tookit/slices/store"
import { SubmitHandler, useForm } from "react-hook-form"
import PageTitle from "./layout/PageTitle"

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
      <PageTitle title="Categories" />
      <h1>Categories</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="form-main">
          <p className="heading">Create Category</p>

          <div className="input-container">
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
          <div className="input-container">
            <label htmlFor="categorySlug">Category Slug</label>
            <input
              type="text"
              {...register("categorySlug", {
                required: "Category Slug is required",
                minLength: {
                  value: 2,
                  message: "Category Slug must be at least 2 characters"
                }
              })}
            />
            {errors.categorySlug && <p className="error">{errors.categorySlug.message}</p>}
          </div>
          <div className="input-container">
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

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3}>Loading ...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={3}>Error: {error}</td>
            </tr>
          )}
          {categories && categories.length > 0
            ? categories.map((category) => (
                <SingleCategory key={category.categoryId} category={category} />
              ))
            : !isLoading && (
                <tr>
                  <td colSpan={3}>No categories found.</td>
                </tr>
              )}
        </tbody>
      </table>

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
