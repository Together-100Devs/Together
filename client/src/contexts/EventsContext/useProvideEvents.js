import { useState } from "react";

const useProvideEvents = () => {
  const [events, setEvents] = useState([]);

  return {
    events,
    setEvents,
  };
};

export default useProvideEvents;
