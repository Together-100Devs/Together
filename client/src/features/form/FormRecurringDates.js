import React, { useState, useEffect } from "react";
import { useFormContext } from "contexts/FormContext";

// Handles if your events are recurring and on which days of the week they will recur
export default function FormRecurringDates() {
  const { formData, setFormData } = useFormContext();
  const [recurringDaysHidden, setRecurringDaysHidden] = useState("");

  // This handles how the "days of the week" checkboxes should be hidden when the event is non-recurring
  useEffect(() => {
    // If Not Recurring, set days of week checkboxes to be invisible
    if (formData.recurring.rate === "noRecurr") {
      setRecurringDaysHidden("hidden");
      formData.recurring.days = []; // Reset days array
    } else {
      setRecurringDaysHidden("");
    }
  }, [formData.recurring, formData.recurring.rate]);

  // This handles the value change when a recurrence rate checkbox is selected
  const handleDaysOfWeekChange = e => {
    const { value } = e.target;

    //if day is already checked, uncheck it
    if (formData.recurring.days.includes(value)) {
      formData.recurring.days = formData.recurring.days.filter(day => {
        return day !== value;
      });
    } else {
      //otherwise check it
      formData.recurring.days.push(value);
    }
    setFormData({ ...formData });
  };

  // This handles the value change when a day of the week for a weekly recurring event is selected
  const handleRateChange = e => {
    const { name } = e.target;

    // Handle the rates of occurunces
    formData.recurring.rate = name;

    setFormData({ ...formData });
  };

  return (
    <div className="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
        Recurring
      </div>
      <div className="bg-white py-4 p-1 my-2 flex border border-gray-200 rounded">
        {/* WEEKLY */}
        <div className="border-r pr-6">
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleRateChange}
              value="rate"
              name="weekly"
              label="weekly"
              checked={!!(formData.recurring.rate === "weekly")}
              className="  mx-1 outline-non text-gray-800"
            />
            <p>Weekly</p>
          </div>

          {/* NOT RECURRING */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleRateChange}
              value="rate"
              name="noRecurr"
              label="noRecurr"
              checked={!!(formData.recurring.rate === "noRecurr")}
              className="  mx-1 outline-non text-gray-800"
            />
            <p>Not Recurring</p>
          </div>
        </div>

        {/* DAYS OF WEEK TO REPEAT EVENT */}
        {/* MONDAY */}
        <div className={" mx-7 " + recurringDaysHidden}>
          {" "}
          {/* This useState changed between "" and "hidden" to hide these checkboxes as needed */}
          <div className="  flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="1"
              name="Monday"
              id="Monday"
              checked={!!formData.recurring.days.includes("1")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Monday</p>
          </div>
          {/* TUESDAY */}
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="2"
              name="Tuesday"
              id="Tuesday"
              checked={!!formData.recurring.days.includes("2")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Tuesday</p>
          </div>
          {/* WEDNESDAY */}
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="3"
              name="Wednesday"
              id="Wednesday"
              checked={!!formData.recurring.days.includes("3")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Wednesday</p>
          </div>
          {/* THURSDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="4"
              name="Thursday"
              checked={!!formData.recurring.days.includes("4")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Thursday</p>
          </div>
          {/* FRIDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="5"
              name="Friday"
              checked={!!formData.recurring.days.includes("5")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Friday</p>
          </div>
          {/* SATURDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="6"
              name="Saturday"
              checked={!!formData.recurring.days.includes("6")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Saturday</p>
          </div>
          {/* SUNDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="0"
              name="Sunday"
              checked={!!formData.recurring.days.includes("0")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Sunday</p>
          </div>
          {/* END DAYS OF WEEK CHECKBOXES */}
        </div>
      </div>
    </div>
  );
}
