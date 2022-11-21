import React, { useState, useEffect } from 'react';
// components
import MonthAndYear from './MonthAndYear';
import AllDays from './AllDays';
import DayCardList from './DayCardList';
// Utility functions
import eventService from 'test/events.js'
import useDate from 'hooks/useDate';
import { getMatchMonth, getEventsByDayNumber } from 'utilities/calendar';

const Calendar = () => {
  const date = useDate();
  const [events, setEvents] = useState([]);

  const eventsInSelectedMonth = getMatchMonth(date.month, events);
  // Populate appropriate days with event titles
  const data = Array.from({ length: date.daysInMonth }, (_, i) => {
    const currentDay = i + 1;
    return {
      day: currentDay,
      month: date.month,
      events: getEventsByDayNumber(currentDay, eventsInSelectedMonth)
    }
  })

  useEffect(() => {
    // Fetch events from server
    const fetch = async () => {
      const eventsData = await eventService.get()
      setEvents(eventsData)
    };
  
    fetch()
  },[])

  // Render nothing when events array is empty
  const emptyEvents = !events.length;
  if (emptyEvents) return null;

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