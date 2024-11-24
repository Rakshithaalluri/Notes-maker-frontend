// src/components/SearchBar.js
import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ 
  searchTerm, 
  selectedCategory, 
  categories, 
  onSearchChange, 
  onCategoryChange 
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;