import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingList = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="recipe-item">
      <Skeleton width="54px" height="53px" circle={true} />
      <div className="recipe-info" style={{ marginLeft: "20px" }}>
        <h3>
          <Skeleton width={200} />
        </h3>
        <div className="tags">
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  ));
};

export default LoadingList;
