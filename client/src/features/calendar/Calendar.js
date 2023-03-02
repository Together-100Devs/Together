import React, { useState, useEffect } from "react";
// components
import AllDays from "./AllDays";
import DayCardList from "./DayCardList";
// Utility functions
// For getting real data
import DataService from "services/dataService";
import { getEventsByDayNumber } from "utilities/calendar";
import { parse } from "date-fns";
import { useEventsContext } from "contexts/EventsContext";

const Calendar = ({ date }) => {
  const { events, setEvents } = useEventsContext();
  const [loading, setLoading] = useState(true);
  // An array of days containing events for populating the calendar
  const days = Array.from({ length: date.daysInMonth }, (_, i) => {
    const currentDay = i + 1;

    //Creates dateObject using month spelled out in a string, currentDay and year
    const dateObject = parse(
      `${date.month}, ${currentDay}, ${date.year}`,
      "MMMM, d, yyyy",
      new Date()
    );
    return {
      date: dateObject,
      events: getEventsByDayNumber(currentDay, events),
    };
  });

  useEffect(() => {
    setLoading(true);
    // Fetch events from server
    const fetch = async () => {
      // Database data from server
      const response = await DataService.getAll(date.monthStart, date.monthEnd);
      setEvents(response.data);
    };

    fetch().then(setLoading(false)).catch(setLoading(false));
  }, [setEvents, date]);

  // Render nothing while fetching for data from server
  if (loading) return null;

  return (
    <div className="flex flex-grow h-full w-full overflow-auto text-gray-700 bg-white">
      <div className="flex flex-col flex-grow">
        <AllDays />
        <DayCardList data={days} firstDayOfMonth={date.firstDay} />
      </div>
    </div>
  );
};

export default Calendar;
