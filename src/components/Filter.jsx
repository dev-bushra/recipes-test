// FilterComponent.js
import React, { memo } from "react";

const FilterComponent = memo(
  ({ searchTerm, onSearch, sortBy, sortOrder, onSort }) => {
    return (
      <div className="filter-component">
        <div className="sort-options">
          <button
            onClick={() => onSort("name")}
            className={sortBy === "name" ? "active" : ""}
          >
            Sort by Name {sortBy === "name"}
          </button>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search recipe by name"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    );
  }
);

export default FilterComponent;
