import React from "react";

import useDate from "hooks/useDate";
import MonthAndYear from "./MonthAndYear";
import AllDays from "./AllDays";
import DayCardList from "./DayCardList";

const Calendar = () => {
  const date = useDate();
  // Dummy data
  const data = Array.from({ length: date.daysInMonth }, (_, i) => ({
    day: i + 1,
    month: date.month,
    events: [
      {
        time: "8:30am",
        confirmed: false,
        title: "An unconfirmed event",
      },
      {
        time: "2:15pm",
        confirmed: true,
        title: "An confirmed event",
      },
    ],
  }));

  return (
    <div className="flex flex-grow w-screen h-screen overflow-auto text-gray-700">
      <div className="flex flex-col flex-grow">
        <MonthAndYear
          month={date.month}
          year={date.year}
          handleNextMonth={date.getNextMonth}
          handlePreviousMonth={date.getPreviousMonth}
        />
        <AllDays />
        <DayCardList data={data} firstDayOfMonth={date.firstDay} />
      </div>
    </div>
  );
};

export default Calendar;
