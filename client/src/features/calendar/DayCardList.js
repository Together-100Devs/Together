import React from "react";
import { formatToLocalTime } from 'utilities/calendar';

const DayCardList = ({ data, firstDayOfMonth }) => {
  // Use for generating empty divs to fill days from previous month
  const DAYS = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  const daysFromPrevMonth = Array.from(
    { length: DAYS[firstDayOfMonth] },
    (_, i) => i + 1
  );



  return (
    <div className="grid flex-grow w-full h-auto grid-cols-7 grid-rows-5 gap-px pt-px mt-1 bg-gray-200">
      {/* Empty div used for days that are not in the month */}
      {daysFromPrevMonth.map(day => (
        <div key={`day-${day}`}></div>
      ))}

      {data.map(dayData => (
        <DayCard key={dayData.day} {...dayData} />
      ))}
    </div>
  );
};

const DayCard = ({ day, month, events }) => {
  // Styling for bullet point
  const confirmedCss = "bg-gray-500";
  const unconfirmedCSss = "border border-gray-500";

  return (
    <div className="relative flex flex-col bg-white group">
      <span className="mx-2 my-1 text-xs font-bold">
        {day} {day === 1 && month}
      </span>

      <div className="flex flex-col px-1 py-1 overflow-auto">
        {events.map(event => (
          <button
            key={event.title}
            className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200"
          >
            <span
              className={`flex-shrink-0 w-2 h-2 ${event.confirmed ? confirmedCss : unconfirmedCSss
                } rounded-full`}
            ></span>
            <span className="ml-2 font-light leading-none">{formatToLocalTime(event.initialDate || event.start)}</span>
            <span className="ml-2 font-medium leading-none truncate">
              {event.title}
            </span>
          </button>
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

export default DayCardList;
