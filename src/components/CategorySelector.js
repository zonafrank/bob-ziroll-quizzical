import React from "react";

const CategorySelector = ({
  handleSelectCategoryChange,
  categories,
  playStarted
}) => {
  return (
    <label htmlFor="select-category" id="select-category-wrapper">
      <span>select category</span>
      <select
        name="select-category"
        id="select-category"
        onChange={handleSelectCategoryChange}
        disabled={playStarted}
      >
        {Object.entries(categories).map((category) => {
          return (
            <option key={category[1]} value={category[1]}>
              {category[0]}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CategorySelector;
