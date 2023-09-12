import React from "react";
import { useEffect, useState } from "react";
import "index.css";
import DataService from "services/dataService";
import EventCard from "features/adminDashboard/EventCard";
import GroupEventCard from "features/adminDashboard/GroupEventCard";

export const AdminDashboard = () => {
  const [singleEvents, setSingleEvents] = useState({});
  const [groupEvents, setGroupEvents] = useState({});
  const [loading, setLoading] = useState(false);

  const handleGetAllEvents = async () => {
    setLoading(true);
    const response = await DataService.getAll();

    // Filter only single events
    setSingleEvents(response.data.filter(e => e.groupId === null));

    // Group remaining events by groupId
    let gEvents = response.data.reduce((map, event) => {
      // Ignore events without a groupId
      if (event.groupId === null) {
        return map;
      }

      // Collect events with a groupId
      if (event.groupId in map) {
        map[event.groupId].push(event);
      } else {
        map[event.groupId] = [event];
      }

      return map;
    }, {});

    setGroupEvents(gEvents);
    setLoading(false);
  };

  // Load all events on initial page render
  useEffect(() => {
    const fetch = async () => await handleGetAllEvents();
    fetch();
  }, []);

  const singleEventCount = loading
    ? "LOADING..."
    : Object.keys(singleEvents).length;
  const groupEventCount = loading
    ? "LOADING..."
    : Object.keys(groupEvents).length;
  const eventStatus = loading
    ? "LOADING..."
    : singleEventCount + groupEventCount;
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
      <section id="events" className="h-full my-2 bg-teal-light rounded-lg p-4">
        <h2 className="font-bold font-inconsolata text-2xl md:text-3xl lg:text-4xl text-teal">
          Singular Events (
          <span className="event-count">{singleEventCount}</span>)
        </h2>
        <hr />
        <section id="single-events">
          {/* Display all events in an unordered list when the data is finished loading */}
          {loading ||
            Object.keys(singleEvents).map(key => {
              return (
                <EventCard
                  key={singleEvents[key]._id}
                  event={singleEvents[key]}
                />
              );
            })}
        </section>
        <section id="group-events">
          <h2 className="font-bold font-inconsolata text-2xl md:text-3xl lg:text-4xl text-teal">
            Recurring Events (
            <span className="event-count">{groupEventCount}</span>)
          </h2>
          <hr />
          {loading ||
            Object.keys(groupEvents).map(key => {
              return (
                <GroupEventCard
                  key={groupEvents[key]._id}
                  events={groupEvents[key]}
                />
              );
            })}
        </section>
      </section>
    </div>
  );
};
