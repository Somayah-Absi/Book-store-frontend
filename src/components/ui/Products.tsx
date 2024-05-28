import { fetchProducts, searchProducts } from "@/tookit/slices/ProductSlice";
import { AppDispatch, RootState } from "@/tookit/slices/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleProduct } from "../SingleProduct";
import useCategoryState from "../hooks/useCategoryState";
import { fetchCategories } from "@/tookit/slices/CategorySlice";
import PageTitle from "../layout/PageTitle";

export const Products = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  );
  const { categories } = useCategoryState();
  const dispatch: AppDispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const fetchData = async (
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    selectedCategory: string
  ) => {
    await dispatch(
      fetchProducts({ pageNumber, pageSize, sortBy, selectedCategory, minPrice, maxPrice })
    );
  };

  useEffect(() => {
    fetchData(pageNumber, pageSize, sortBy, selectedCategory);
  }, [pageNumber, pageSize, sortBy, selectedCategory, minPrice, maxPrice, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber: 1, pageSize: 20 }));
    };
    fetchData();
  }, [dispatch]);

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1);
  };

  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      await dispatch(searchProducts(searchKeyword));
    } else {
      await fetchData(pageNumber, pageSize, sortBy, selectedCategory);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPageNumber(1);
    fetchData(1, pageSize, sortBy, categoryId);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = e.target.value ? Number(e.target.value) : undefined;
    setMinPrice(newMinPrice);
    setPageNumber(1);
    fetchData(1, pageSize, sortBy, selectedCategory);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = e.target.value ? Number(e.target.value) : undefined;
    setMaxPrice(newMaxPrice);
    setPageNumber(1);
    fetchData(1, pageSize, sortBy, selectedCategory);
  };

  return (
    <div className="products-page">
      <PageTitle title="Products" />
      <div style={{ display: "flex" }}>
        <div className="sidebar">
          <h1 className="product-header">Products</h1>
          <div className="search-bar">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleInputChange}
              placeholder="Search products..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="select">
            <p>Sort By :</p>
            <select name="sortBy" onChange={handleSortChange}>
              <option value="id">ID</option>
              <option value="price">Price</option>
              <option value="product name">Product Name</option>
              <option value="create date">Create Date</option>
            </select>
          </div>
          <div className="category-filter">
            <h2>Filter by Category</h2>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <div key={category.categoryId}>
                  <label htmlFor={`category-${category.categoryId}`}>
                    <input
                      type="radio"
                      id={`category-${category.categoryId}`}
                      name="category"
                      value={category.categoryId}
                      onChange={() => handleCategoryChange(category.categoryId)}
                    />
                    {category.categoryName}
                  </label>
                </div>
              ))}
          </div>
          <div className="price-container">
            <h2>Filter by Price</h2>
            <label htmlFor="min-price">
              Min Price:
              <input className="price-input" type="text" name="min-price" id="min-price" onChange={handleMinPrice} />
            </label>
            <label htmlFor="max-price">
              Max Price:
              <input className="price-input" type="text" name="max-price" id="max-price" onChange={handleMaxPrice} />
            </label>
          </div>
        </div>
        <div className="main-content">
          <div className="products-container">
            {isLoading && <p>Loading ...</p>}
            {error && <p>Error: {error}</p>}
            {products &&
              products.length > 0 &&
              products.map((product, index) => <SingleProduct key={index} product={product} />)}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => setPageNumber(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
