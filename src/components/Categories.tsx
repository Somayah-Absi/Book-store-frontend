import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SingleCategory } from "./SingleCategory";

import { Category } from "@/types"; // Import the Category type
import { fetchCategories } from "@/tookit/slices/CategorySlice";
import { AppDispatch, RootState } from "@/tookit/slices/store";

export const Categories = () => {
  const { categories, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.categoryR
  );
  const dispatch: AppDispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Dispatching fetchCategories with:", { pageNumber, pageSize });
      await dispatch(fetchCategories({ pageNumber, pageSize }));
    };
    fetchData();
  }, [pageNumber]);

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  return (
    <div className="category-header">
      <h1>Categories</h1>
      <div className="categories-container">
        {isLoading && <p>Loading ...</p>}
        {error && <p>Error: {error}</p>}
        {categories && categories.length > 0 ? (
          categories.map((category, index) =>  <SingleCategory key={index} category={category} />
          )
        ) : (
          !isLoading && <p>No categories found.</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPageNumber(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
