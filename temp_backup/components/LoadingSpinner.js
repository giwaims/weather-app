import React from "react";
import { motion } from "framer-motion";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <div className="spinner-container">
      <motion.div
        animate={{ rotate: 360 }}
        transition={spinTransition}
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTop: '3px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          margin: '0 auto'
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
