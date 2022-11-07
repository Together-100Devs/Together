import React from 'react';

import MonthAndYear from './MonthAndYear';
import AllDays from './AllDays';
import DayCardList from './DayCardList';

const Calendar = () => {
  // Dummy data
  const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    month: 'September',
    events: [
      {
        time: '8:30am',
        confirmed: false,
        title: 'An unconfirmed event'
      },
      {
        time: '2:15pm',
        confirmed: true,
        title: 'An confirmed event'
      },
    ],
  }))

  return (
    <div className="flex flex-grow w-screen h-screen overflow-auto text-gray-700">
      <div className="flex flex-col flex-grow">
        <MonthAndYear month="September" year="2020" />
        <AllDays />
        <DayCardList data={data} />
      </div>
    </div>
  );
};

export default Calendar;