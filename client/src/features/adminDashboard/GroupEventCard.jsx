import React from "react";
import EventCard from "features/adminDashboard/EventCard";

function GroupEventCard({ events }) {
  return (
    <section className="group-event">
      <EventCard key={events[0]._id} event={events[0]} />
    </section>
  );
}

export default GroupEventCard;
