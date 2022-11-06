import React from 'react';

const MonthAndYear = ({ month, year}) => {
  return (
    <div className="flex items-center mt-4">
      <div className="flex ml-6">
        <button>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <h2 className="ml-2 text-xl font-bold leading-none">{month}, {year}</h2>
    </div>
  )
};

export default MonthAndYear;