import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/tookit/slices/store"
import {
  CreateProducts,
  DeleteProducts,
  fetchProducts,
  updateProduct
} from "@/tookit/slices/ProductSlice"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateProduct } from "@/types"

export const AdminProductsManagement = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [sortBy, setSortBy] = useState("id")
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<CreateProduct | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateProduct>()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, sortBy }))
    }
    fetchData()
  }, [dispatch, pageNumber, pageSize, sortBy])

  const handleDelete = async (id: string) => {
    try {
      dispatch(DeleteProducts(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

  const handleEdit = (product: CreateProduct) => {
    setCurrentProduct(product)
    setIsEditFormVisible(true)
    reset(product)
  }

  const handleCancelEdit = () => {
    setCurrentProduct(null)
    setIsEditFormVisible(false)
    reset()
  }

  const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
    try {
      if (currentProduct) {
        await dispatch(updateProduct({ productId: currentProduct.productId, updateProduct: data }))
        handleCancelEdit()
      } else {
        await dispatch(CreateProducts(data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="product-header">
      <h1>Products</h1>
      <div className="select">
        <h2>Sort By</h2>
        <select name="sortBy" onChange={handleSortChange}>
          <option value="id">ID</option>
          <option value="price">Price</option>
          <option value="productName">Product Name</option>
          <option value="createDate">Create Date</option>
        </select>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-main">
        <p className="heading">{currentProduct ? "Edit Product" : "Create Product"}</p>

        <div className="input-container">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product Name is required",
              minLength: {
                value: 2,
                message: "Product Name must be at least 2 characters"
              }
            })}
          />
          {errors.productName && <p className="error">{errors.productName.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="productDescription">Product Description</label>
          <input
            type="text"
            {...register("productDescription", {
              required: "Product Description is required",
              minLength: {
                value: 2,
                message: "Product Description must be at least 2 characters"
              }
            })}
          />
          {errors.productDescription && (
            <p className="error">{errors.productDescription.message}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="productPrice">Product Price</label>
          <input
            type="number"
            {...register("productPrice", {
              required: "Product Price is required",
              min: {
                value: 0,
                message: "Product Price must be at least 0"
              }
            })}
          />
          {errors.productPrice && <p className="error">{errors.productPrice.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="productImage">Product Image URL</label>
          <input
            type="text"
            {...register("productImage", {
              required: "Product Image URL is required"
            })}
          />
          {errors.productImage && <p className="error">{errors.productImage.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="productQuantityInStock">Product Quantity in Stock</label>
          <input
            type="number"
            {...register("productQuantityInStock", {
              required: "Product Quantity in Stock is required",
              min: {
                value: 0,
                message: "Product Quantity in Stock must be at least 0"
              }
            })}
          />
          {errors.productQuantityInStock && (
            <p className="error">{errors.productQuantityInStock.message}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="categoryId">Category ID</label>
          <input
            type="text"
            {...register("categoryId", {
              required: "Category ID is required"
            })}
          />
          {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}
        </div>

        <button id="button" type="submit">
          {currentProduct ? "Update" : "Submit"}
        </button>
        {isEditFormVisible && <button onClick={handleCancelEdit}>Cancel</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.categoryId}</td>
                <td>
                  <img
                    src={product.productImage}
                    alt={product.productSlug}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>{product.productPrice}</td>
                <td>{product.productQuantityInStock}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.productId)}>Delete</button>
                </td>
              </tr>
            ))}
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
