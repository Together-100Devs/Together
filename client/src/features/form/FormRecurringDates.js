import React from 'react';
import { useFormContext } from "contexts/FormContext";

// Handles if your events are recurring and on which days of the week they will recur
export default function FormRecurringDates() {
  const { formData, setFormData } = useFormContext();

  const handleChange = e => {

    const { name, value } = e.target;
    
    // Handle the rates of occurunces
    if (value === "rate") {
      //ensures that only one of 'weekly', 'monthly', or 'no recurring' can be checked at a time
      formData.recurring.rate = name;
    } else {
      //if day is already checked, uncheck it
      if (formData.recurring.days.includes(name)) {
        formData.recurring.days = formData.recurring.days.filter(day => {
          return day !== name;
        });
      } else {
        //otherwise check it
        formData.recurring.days.push(name);
      }
    }
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
              onChange={handleChange}
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
              onChange={handleChange}
              value="rate"
              name="noRecurr"
              label="noRecurr"
              checked={!!(formData.recurring.rate === "noRecurr")}
              className="  mx-1 outline-non text-gray-800"
            />
            <p>No Recurring</p>
          </div>
        </div>

        {/* DAYS OF WEEK TO REPEAT EVENT */}
        {/* MONDAY */}
        <div className=" mx-7 ">
          <div className="  flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="Monday"
              name="Monday"
              id="Monday"
              checked={!!formData.recurring.days.includes("Monday")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Monday</p>
          </div>

          {/* TUESDAY */}
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="Tuesday"
              name="Tuesday"
              id="Tuesday"
              checked={!!formData.recurring.days.includes("Tuesday")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Tuesday</p>
          </div>

          {/* WEDNESDAY */}
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="Wednesday"
              name="Wednesday"
              id="Wednesday"
              checked={!!formData.recurring.days.includes("Wednesday")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Wednesday</p>
          </div>

          {/* THURSDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="Thursday"
              name="Thursday"
              checked={!!formData.recurring.days.includes("Thursday")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Thursday</p>
          </div>

          {/* FRIDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="Friday"
              name="Friday"
              checked={!!formData.recurring.days.includes("Friday")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Friday</p>
          </div>

          {/* SATURDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="Saturday"
              name="Saturday"
              checked={!!formData.recurring.days.includes("Saturday")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Saturday</p>
          </div>

          {/* SUNDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="Sunday"
              name="Sunday"
              checked={!!formData.recurring.days.includes("Sunday")}
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