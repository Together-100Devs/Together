import { useContext } from "react";
import { FormMoverContext } from "./contexts/FormMoverContext";

// Handles if your events are recurring and on which days of the week they will recur
export default function FormRecurringDates() {

  // This useContext hook passes in the Discord username of the logged in Discord user (in this case), it might do other things for other parts.
  const { userData, setUserData } = useContext(FormMoverContext);
  
  // Handle change of the checkbox values
  const handleChange = e => {

    const { name, value } = e.target;
    
    // Handle the rates of occurunces
    if (value === "rate") {
      // Ensures that only one of 'weekly', 'monthly', or 'no recurring' can be checked at a time
      userData.recurring.rate = name;
    
    // Handle the rate of the only other thing i.e. days of the week
    } else {

      // If another day is already checked when we check another day's checkbox, uncheck it
      if (userData.recurring.days.includes(name)) {
        userData.recurring.days = userData.recurring.days.filter(day => {
          return day !== name;
        });
      } else {
        // Otherwise, it's the first one being checked, so just check it
        userData.recurring.days.push(name);
      }
    }

    // set the original userData var
    setUserData({ ...userData });
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
              checked={!!(userData.recurring.rate === "weekly")}
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
              checked={!!(userData.recurring.rate === "noRecurr")}
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
              checked={!!userData.recurring.days.includes("Monday")}
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
              checked={!!userData.recurring.days.includes("Tuesday")}
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
              checked={!!userData.recurring.days.includes("Wednesday")}
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
              checked={!!userData.recurring.days.includes("Thursday")}
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
              checked={!!userData.recurring.days.includes("Friday")}
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
              checked={!!userData.recurring.days.includes("Saturday")}
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
              checked={!!userData.recurring.days.includes("Sunday")}
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
