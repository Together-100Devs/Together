import React, { createContext, useContext } from "react";

import useProvideEvents from "./useProvideEvents";

// Creating a named context
const EventsContext = createContext();

// Hook for consuming Events related data
export const useEventsContext = () => {
  return useContext(EventsContext);
};

// Creating a provider to wrap components that needs to access Events's data
// Note: a provider is a special component that pass the context to its children to access
const EventsProvider = ({ children }) => {
  const eventsData = useProvideEvents();
  return <EventsContext.Provider value={eventsData}>{children}</EventsContext.Provider>;
};

export default EventsProvider;
