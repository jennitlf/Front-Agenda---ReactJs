import React from "react";
import "./buttonPage.css"

const ButtonPage = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="button-container">
      <button
        id="less"
        onClick={handleBack}
        className="less button-list"
        type="button"
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-angles-left"> </i>
      </button>
      <button
        id="more"
        onClick={handleNext}
        className="more button-list"
        type="button"
        disabled={currentPage === totalPages}
      >
        <i className="fa-solid fa-angles-right"> </i>
      </button>
    </div>
  );
};

export default ButtonPage
