import React, { useState } from "react";
import { Category, CategoryFormEdit } from "@/types";
import { useDispatch } from "react-redux";
import { DeleteCategories, updateCategory } from "@/tookit/slices/CategorySlice";
import { AppDispatch } from "@/tookit/slices/store";
import { SubmitHandler, useForm } from "react-hook-form";

export const SingleCategory = (props: { category: Category }) => {
  const { category } = props;
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CategoryFormEdit>();

  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const handleDelete = (id: string) => {
    dispatch(DeleteCategories(id));
  };

  const handleEdit = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleCancel = () => {
    setIsEditFormVisible(false);
    reset(); 
  };

  const onSubmit: SubmitHandler<CategoryFormEdit> = async (data) => {
    try {
      if (!category.categoryId) {
        console.log("Category id not found");
        return;
      }

      const response = await dispatch(
        updateCategory({ updateCategory: data, categoryId: category.categoryId })
      );

      console.log(response);

      reset();

      setIsEditFormVisible(false);
    } catch (error) {
      console.error("Update category error:", error);
    }
  };

  return (
    <div className="category-card">
      <h3>{category.categoryName}</h3>
      <p>{category.categoryDescription}</p>
      <p>{category.categorySlug}</p>
      <div className="btn-container">
        <button
          className="btn-grad"
          onClick={() => handleDelete(category.categoryId)}
        >
          Delete
          <i className="fa-regular fa-trash fa-lg" style={{ color: "#0e131b" }}></i>
        </button>

        <button className="btn-grad-cart" onClick={handleEdit}>
          Edit
          <i
            className="fa-solid fa-edit fa-lg"
            style={{ color: "#0c1422", marginLeft: "8px" }}
          ></i>
        </button>
      </div>

      {isEditFormVisible && (
        <div className="edit-form">
          <form onSubmit={handleSubmit(onSubmit)} className="form_main">
            <p className="heading">Edit Category</p>

            <div className="inputContainer">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                defaultValue={category.categoryName}
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
              <label htmlFor="categoryDescription">Category Description</label>
              <input
                type="text"
                defaultValue={category.categoryDescription}
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

            <button id="button" type="submit">Submit</button>
            <button id="button" type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};
