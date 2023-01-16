import React from "react";
import { useFormContext } from "contexts/FormContext";
import FormRecurringDates from "./FormRecurringDates";

export default function FormScheduleEvent() {
  const { formData, setFormData } = useFormContext();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value}));
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Location
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={formData["location"] || ""}
            name="location"
            placeholder="Location"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Start Time
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="time"
            onChange={handleChange}
            value={formData["startTime"] || ""}
            name="startTime"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          End Time
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="time"
            onChange={handleChange}
            value={formData["endTime"] || ""}
            name="endTime"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>

      <div>
        <FormRecurringDates />
      </div>
    </div>
  );
}