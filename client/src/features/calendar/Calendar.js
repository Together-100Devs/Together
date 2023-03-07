import React, { useState, useEffect } from "react";
// components
import AllDays from "./AllDays";
import DayCardList from "./DayCardList";
// Utility functions
// For getting real data
import DataService from "services/dataService";
import { getMatchMonthAndYear, getEventsByDayNumber } from "utilities/calendar";
import { parse } from "date-fns";
import { useEventsContext } from "contexts/EventsContext";

const Status = {
  IDLE: "idle",
  LOADING: "loading",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const Calendar = ({ date }) => {
  const { events, setEvents, cache } = useEventsContext();
  // status and errors or api calls
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  const eventsInSelectedMonth = getMatchMonthAndYear(
    date.month,
    date.year,
    events
  );

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
      events: getEventsByDayNumber(currentDay, eventsInSelectedMonth),
    };
  });

  useEffect(() => {
    // Fetch events from server
    const fetch = async () => {
      // Database data from server
      const response = await DataService.getAll(date.monthStart, date.monthEnd);
      return response.data;
    };
    // if the same call has already been made, do not repeat it
    if (!cache.current.includes(date.monthStart)) {
      setStatus(Status.LOADING);
      cache.current.push(date.monthStart);
      fetch()
        .then(data => {
          setEvents(prev => [...prev, ...data]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error.message);
          setStatus(Status.REJECTED);
        });
    }
  }, [setEvents, date.monthStart, date.monthEnd, cache]);

  // Render nothing while fetching for data from server
  // if (status === Status.LOADING) return null;

  return (
    <div className="flex flex-grow h-full w-full overflow-auto text-gray-700 bg-white">
      <div className="flex flex-col flex-grow">
        {/* render error message if there was an error fetching data */}
        {status === Status.REJECTED && <div>{error}</div>}
        <AllDays />
        <DayCardList data={days} firstDayOfMonth={date.firstDay} />
      </div>
    </div>
  );
};

export default Calendar;
