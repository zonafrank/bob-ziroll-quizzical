import React from "react";
import CategorySelector from "./CategorySelector";

const Header = ({ categories, handleSelectCategoryChange, playStarted }) => {
  return (
    <header id="header">
      <CategorySelector
        categories={categories}
        handleSelectCategoryChange={handleSelectCategoryChange}
        playStarted={playStarted}
      />
    </header>
  );
};

export default Header;
