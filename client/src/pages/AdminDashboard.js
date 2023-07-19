import React from "react";
import { useEffect, useState } from "react";
import "index.css";
import DataService from "services/dataService";

export const AdminDashboard = () => {
  const [allEvents, setAllEvents] = useState({});
  const [loading, setLoading] = useState(false);

  const handleGetAllEvents = async () => {
    setLoading(true);
    const response = await DataService.getAll();
    setAllEvents(response.data);
    setLoading(false);
  };

  // Load all events on initial page render
  useEffect(() => {
    const fetch = async () => await handleGetAllEvents();
    fetch();
  }, []);

  let eventStatus = loading ? "LOADING..." : Object.keys(allEvents).length;
  return (
    <div className="flex flex-col h-100 min-h-screen w-full p-4 bg-primary">
      <div className="border-b-2 border-mainOrange border-dotted flex justify-between py-2">
        <h1 className="font-bold font-inconsolata text-3xl md:text-4xl lg:text-5xl text-mainOrange">
          Admin Dashboard (<span className="event-count">{eventStatus}</span>)
        </h1>
        {/* Button to trigger refresh of event list after initial page load */}
        <button
          onClick={handleGetAllEvents}
          className="refresh-btn bg-white border-2 border-black flex flex-col justify-center items-center px-4"
        >
          🗘 Refresh Events
        </button>
      </div>
      <div id="events" className="h-full mt-2">
        {/* Display all events in an unordered list when the data is finished loading */}
        {loading ||
          Object.keys(allEvents).map(key => {
            return (
              <div
                key={allEvents[key].id}
                className="event bg-primary my-4 p-4 rounded-xl"
              >
                <ul className="font-inconsolata">
                  <li className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    {allEvents[key].title}
                  </li>
                  <li className="text-mainBlue">
                    {allEvents[key].description}
                  </li>
                  <hr className="border-teal-light" />
                  <li>Scheduled by: {allEvents[key].user.displayName}</li>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};
