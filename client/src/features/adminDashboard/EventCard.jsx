import React from "react";

function EventCard({ event }) {
  return (
    <section
      key={event.id}
      className="single-event bg-primary my-4 p-4 rounded-xl"
    >
      <ul className="font-inconsolata">
        <li className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {event.title}
        </li>
        <li className="text-mainBlue">{event.description}</li>
        <hr className="border-teal-light" />
        <li>Scheduled by: {event.user?.displayName || "UNKNOWN"}</li>
      </ul>
    </section>
  );
}

export default EventCard;
