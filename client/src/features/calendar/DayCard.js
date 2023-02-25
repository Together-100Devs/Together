import { isSameDay, format } from "date-fns";
import React from "react";
import Event from "./Event";
import { useFormModalContext } from "contexts/FormModalContext";
import { useFormContext } from "contexts/FormContext";
import startOfDay from "date-fns/startOfDay";

const DayCard = ({ date, events }) => {
  const { setFormData } = useFormContext();
  const formModal = useFormModalContext();

  //Extracts month in long format from date object
  const month = format(date, "MMMM");

  //Extracts day from date object
  const day = date.getDate();

  //Checks if current day matches date
  const sameDayCheck = isSameDay(startOfDay(date), new Date());

  // Sort events by startAt property
  let sortedEvents = [...events].sort(
    (a, b) => new Date(a.startAt) - new Date(b.startAt)
  );

  return (
    <div
      className={`relative flex flex-col bg-white group ${
        sameDayCheck ? "border-[3px] border-teal-light" : "bg-white"
      }`}
    >
      <span
        className={`block px-2 py-1 text-xs font-bold ${
          sameDayCheck && "bg-teal-light"
        }`}
      >
        {day} {day === 1 && month}
      </span>

      <div className="flex flex-col px-1 py-1 overflow-auto">
        {sortedEvents.map((event, i) => (
          <Event event={event} key={i} />
        ))}
      </div>

      <button
        className="absolute bottom-0 right-0 items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500"
        onClick={() => {
          let chosenDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          setFormData(prevFormData => ({
            ...prevFormData,
            initialDate: chosenDate,
            finalDate: chosenDate,
          }));
          formModal.handleOpen();
        }}
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default DayCard;
