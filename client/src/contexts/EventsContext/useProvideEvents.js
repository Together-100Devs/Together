import { useState } from "react";

const useProvideEvents = () => {
  const [events, setEvents] = useState([]);

  const addEvents = (newEvents) => {
    setEvents([
      ...events,
      ...newEvents,
    ])
  }

  return {
    events,
    setEvents,
    addEvents,
  };
};

export default useProvideEvents;
