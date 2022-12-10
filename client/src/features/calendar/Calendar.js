import React, { useState, useEffect } from 'react';
// components
import MonthAndYear from './MonthAndYear';
import AllDays from './AllDays';
import DayCardList from './DayCardList';
// Utility functions
// For testing fake json data (should be unblocked to run testserver)
import eventService from 'test/events.js'
// For getting real data
// import DataService from "services/dataService";
import useDate from 'hooks/useDate';
import { getMatchMonth, getEventsByDayNumber } from 'utilities/calendar';

const Calendar = () => {
  const date = useDate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const eventsInSelectedMonth = getMatchMonth(date.month, events);
  // An array of days containing events for populating the calendar
  const days = Array.from({ length: date.daysInMonth }, (_, i) => {
    const currentDay = i + 1;
    return {
      day: currentDay,
      month: date.month,
      events: getEventsByDayNumber(currentDay, eventsInSelectedMonth)
    }
  })

  useEffect(() => {
    setLoading(true);
    // Fetch events from server
    const fetch = async () => {
      // For testing fake json data
      const eventsData = await eventService.get()
      setEvents(eventsData)

      // Database data from server
      // const response = await DataService.getAll()
      // setEvents(response.data);
    };

    fetch()
      .then(setLoading(false))
      .catch(setLoading(false))
  }, [])

  // Render nothing while fetching for data from server
  if (loading) return null;

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
        <DayCardList data={days} firstDayOfMonth={date.firstDay} />
      </div>
    </div>
  );
};

export default Calendar;
