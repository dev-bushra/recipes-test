import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import MessageBox from "./MessageBox";

const RecipeDetails = memo(({ recipe, loading }) => {
  if (loading) {
    return (
      <div className="recipe-details">
        <div>
        <h3 style={{ marginBottom: "16px" }} className="recipe-title">
        Recipe Details
      </h3>
      <hr style={{ marginBottom: "25px" }} />
      </div>
        <div className="recipe-header">
        <Skeleton width={600} height={30} count={2} />
          <Skeleton width={300} height={200} />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-details">
        <MessageBox>No details to show</MessageBox>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <h3 style={{ marginBottom: "16px" }} className="recipe-title">
        Recipe Details
      </h3>
      <hr style={{ marginBottom: "25px" }} />
      <div className="recipe-header">
        <div className="section">
          {recipe.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
          <h3
            className="recipe-title"
            style={{ fontWeight: "400", fontSize: "20px", paddingTop: "10px" }}
          >
            {recipe.name}
          </h3>
          <div className="list">
            {recipe.ingredients.map((ingredient, index) => (
              <span key={index}>{ingredient} / </span>
            ))}
          </div>

          <div className="" style={{ marginTop: "20px", maxWidth: "65%" }}>
            <span className="section-title">Preparation Steps:</span>
            <br />
            <span className="list">{recipe.instructions}</span>
          </div>
        </div>
        <img
          className="detail-image"
          style={{ marginRight: "3rem" }}
          src={recipe.image}
          alt={recipe.name}
        />
      </div>
    </div>
  );
});

export default RecipeDetails;
