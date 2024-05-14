import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

interface Category {
  categoryId: number;
  categoryName: string;
 
}

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="App">
      <h1>Categories</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching categories: {error.message}</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.categoryId}>{category.categoryName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
