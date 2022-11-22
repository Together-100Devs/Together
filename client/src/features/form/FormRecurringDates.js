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
              value="monday"
              name="monday"
              id="monday"
              checked={!!userData.recurring.days.includes("monday")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Monday</p>
          </div>
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="tuesday"
              name="tuesday"
              id="tuesday"
              checked={!!userData.recurring.days.includes("tuesday")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Tuesday</p>
          </div>
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="wednesday"
              name="wednesday"
              id="wednesday"
              checked={!!userData.recurring.days.includes("wednesday")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Wednesday</p>
          </div>
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="thursday"
              name="thursday"
              checked={!!userData.recurring.days.includes("thursday")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Thursday</p>
          </div>
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="friday"
              name="friday"
              checked={!!userData.recurring.days.includes("friday")}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Friday</p>
          </div>
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="saturday"
              name="saturday"
              checked={!!userData.recurring.days.includes("saturday")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Saturday</p>
          </div>
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleChange}
              value="sunday"
              name="sunday"
              checked={!!userData.recurring.days.includes("sunday")}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Sunday</p>
          </div>
        </div>
      </div>
    </div>
  );
}
