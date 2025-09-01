import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      className={`search-bar glass ${expanded ? "expanded" : ""}`}
      onClick={handleExpand}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        borderRadius: '20px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        margin: '0 auto 24px',
        maxWidth: expanded ? '300px' : '48px',
        transition: 'max-width 0.3s ease',
        cursor: 'pointer',
        fontFamily: 'Lexend, Arial, sans-serif'
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSearch className="icon" style={{ color: '#fff', opacity: 0.7 }} />
      </motion.div>
      <AnimatePresence>
        {expanded && (
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="Enter city name..."
            value={query}
            onChange={handleChange}
            onBlur={handleCollapse}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              outline: 'none',
              fontSize: '1rem',
              fontFamily: 'inherit',
              width: '100%'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;
