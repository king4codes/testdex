import React from "react";

const SearchButton = ({ openSearchModal }) => {
  return (
    <div>
      <button
        className="rs-button w-full flex items-center justify-center"
        onClick={openSearchModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <span>Search Grand Exchange</span>
      </button>
    </div>
  );
};

export default SearchButton;
