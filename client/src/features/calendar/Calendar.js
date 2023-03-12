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

const Calendar = ({ date }) => {
  const { events, setEvents } = useEventsContext();
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    // Fetch events from server
    const fetch = async () => {
      // Database data from server
      const response = await DataService.getAll();
      // if you want to test the loading behavior
      // await new Promise(resolve => setTimeout(resolve, 20_000));
      setEvents(response.data);
    };

    fetch()
      .then(() => {
        setLoading(false);
      })
      .catch(e => {
        alert(e);
        setLoading(false);
      });
  }, [setEvents]);

  // while we are loading events, add the "animate-pulse" class to show skeleteon loading effect
  let classNames =
    "flex flex-grow h-full w-full overflow-auto text-gray-700 bg-white";
  if (loading) {
    classNames += " animate-pulse";
  }

  return (
    <div className={classNames}>
      <div className="flex flex-col flex-grow">
        <AllDays />
        <DayCardList data={days} firstDayOfMonth={date.firstDay} />
      </div>
    </div>
  );
};

export default Calendar;
