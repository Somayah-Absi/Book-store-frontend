import React from "react"
import { Category } from "@/types"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { DeleteCategories } from "@/tookit/slices/CategorySlice"
import { AppDispatch } from "@/tookit/slices/store"

export const SingleCategory = (props: { category: Category }) => {
  const { category } = props
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = (id: string) => {
    dispatch(DeleteCategories(id))
  }
  const handleEdit = (id: string) => {
    alert(id)
  }
  // Log the category data to verify
  console.log("SingleCategory props:", category)

  return (
    <div className="category-card">
      <h3>{category.categoryName}</h3>
      <p>{category.categoryDescription}</p>
      <p>{category.categorySlug}</p>
      <div className="btn-container">
        <button
          className="btn-grad"
          onClick={() => {
            handleDelete(category.categoryId)
          }}
        >Delete
         <i className="fa-regular fa-eye fa-lg" style={{ color: "#0e131b" }}></i>
        </button>

                  <button onClick={() => {handleEdit(category.categoryId)}} className="btn-grad-cart">
            Edit 
            <i
              className="fa-solid fa-cart-plus fa-lg"
              style={{ color: "#0c1422", marginLeft: "8px" }}
            ></i>
          </button>
      
      </div>
    </div>
  )
}
