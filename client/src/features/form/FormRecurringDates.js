import { useContext } from "react";
import { FormMoverContext } from "./contexts/FormMoverContext";

export default function FormRecurringDates() {
  const { userData, setUserData } = useContext(FormMoverContext);
  const handleChange = e => {
    const { name, value } = e.target;
    if (value === "rate") {
      //ensures that only one of 'weekly', 'monthly', or 'no recurring' can be checked at a time
      userData.recurring.rate = name;
    } else {
      //if day is already checked, uncheck it
      if (userData.recurring.days.includes(name)) {
        userData.recurring.days = userData.recurring.days.filter(day => {
          return day !== name;
        });
      } else {
        //otherwise check it
        userData.recurring.days.push(name);
      }
    }
    setUserData({ ...userData });
  };

  return (
    <div className="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
        Recurring
      </div>
      <div className="bg-white py-4 p-1 my-2 flex border border-gray-200 rounded">
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
        </div>
      </div>
    </div>
  );
}
