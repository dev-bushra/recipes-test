import React, { useCallback, useEffect, useRef, useState } from "react";
import RecipeList from "../components/RecipeList";
import RecipeDetails from "../components/RecipeDetails";
import FilterComponent from "../components/Filter";

function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("https://dummyjson.com/recipes?limit=7");
      const data = await response.json();
      setRecipes(data.recipes);
      setSelectedRecipe(data.recipes[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  // Handles consecutive recipe searches, canceling previous requests
  const searchRecipes = useCallback(async (term) => {
    // If there's an ongoing request, abort it
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create a new AbortController
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    // setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${term}&limit=7`,
        { signal }
      );
      const data = await response.json();
      setRecipes(data.recipes);
      setSelectedRecipe(data.recipes[0]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("aborted");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    searchRecipes(term);
  };

  // Handles sorting of recipes based on the name
  const handleSort = (field) => {
    // Toggle sort order if the same field is selected
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    const sorted = [...recipes].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setRecipes(sorted);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <FilterComponent
        searchTerm={searchTerm}
        onSearch={handleSearch}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
      <div className="content">
        <RecipeList
          recipes={recipes}
          selectedRecipe={selectedRecipe}
          onRecipeClick={handleRecipeClick}
          loading={loading}
        />
        <RecipeDetails recipe={selectedRecipe} loading={loading} />
      </div>
    </div>
  );
}

export default HomeScreen;
