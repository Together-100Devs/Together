import React from "react";
import Event from "./Event";

const DayCard = ({ day, month, events }) => {
  // Styling for bullet point

    // Determine the current day
    const currentDay = new Date().getDate();
    //aplies styling if true
    const currentDayStyles = day === currentDay ? { backgroundColor: "#BFD0D8" } : {};

  return (
    <div className="relative flex flex-col bg-white group" style={currentDayStyles}>
      <span className="mx-2 my-1 text-xs font-bold">
        {day} {day === 1 && month}
      </span>

      <div className="flex flex-col px-1 py-1 overflow-auto">
        {events.map((event, i) => (
          <Event event={event} key={i}/>
        ))}
      </div>

      <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default DayCard;
