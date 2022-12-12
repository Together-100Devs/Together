import React from "react";
import { formatToLocalTime } from 'utilities/calendar';

const Event = (props) => {
  return (
    <button
      key={props.event.title}
      className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200"
    >
      <span
        className={`flex-shrink-0 w-2 h-2 ${
          props.event.confirmed ? "bg-gray-500" : "border border-gray-500"
        } rounded-full`}
      ></span>
      <span className="ml-2 font-light leading-none">{formatToLocalTime(props.event.startDate)}</span>
      <span className="ml-2 font-medium leading-none truncate">
        {props.event.title}
      </span>
    </button>
  )
}

export default Event