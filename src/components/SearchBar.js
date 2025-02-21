import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Expand search box when clicked
  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  // Collapse search when clicking away or pressing "Esc"
  const handleCollapse = (e) => {
    if (e.key === "Escape" || e.type === "blur") {
      setExpanded(false);
      setQuery("");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle manual search on "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      onSearch(query);
      setQuery("");
      setExpanded(false);
    }
  };

  return (
    <div className={`search-bar ${expanded ? "expanded" : ""}`}>
      <FaSearch className="search-icon" onClick={handleExpand} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={handleChange}
        onBlur={handleCollapse}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
