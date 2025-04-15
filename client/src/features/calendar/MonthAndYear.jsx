import React from "react";

const MonthAndYear = ({
  month,
  year,
  handlePreviousMonth,
  handleNextMonth,
}) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        <button onClick={handlePreviousMonth}>
          <svg
            className="w-6 h-6 max-[440px]:w-4 max-[440px]:h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button data-cy="next-month" onClick={handleNextMonth}>
          <svg
            className="w-6 h-6 max-[440px]:w-4 max-[440px]:h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <h2 className="max-[440px]:ml-1 ml-2 w-[14ch] max-[440px]:text-base max-[440px]:text-center sm:text-3xl text-xl font-bold leading-none">
        {month}, {year}
      </h2>
    </div>
  );
};

export default MonthAndYear;
