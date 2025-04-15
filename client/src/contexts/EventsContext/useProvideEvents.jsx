import { useRef, useState } from "react";

const useProvideEvents = () => {
  const [events, setEvents] = useState([]);

  // cache to store api call arguments
  const cache = useRef([]);

  const addEvents = newEvents => {
    setEvents([...events, ...newEvents]);
  };

  return {
    events,
    cache,
    setEvents,
    addEvents,
  };
};

export default useProvideEvents;
