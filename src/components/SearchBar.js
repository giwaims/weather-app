import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  const handleCollapse = () => {
    // Optional: Only collapse if query is empty
    if (query.trim() === "") {
      setExpanded(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      onSearch(query);
      setQuery("");
      setExpanded(false);
    } else if (e.key === "Escape") {
      setExpanded(false);
      setQuery("");
    }
  };

  return (
    <div
      className={`search-bar ${expanded ? "expanded" : ""}`}
      onClick={handleExpand}
    >
      <FaSearch className="search-icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onBlur={handleCollapse}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
