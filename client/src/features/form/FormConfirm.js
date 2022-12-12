import { useContext } from "react";
import { FormMoverContext } from "./contexts/FormMoverContext";

export default function FormConfirm() {
  const { userData } = useContext(FormMoverContext);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Title
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["title"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Description
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["description"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Initial Date
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["initialDate"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          End Date
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["finalDate"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Discord Name
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["discordName"] || ""}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Location
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["location"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Start Time
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["startTime"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          End Time
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{userData["endTime"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Recurring
        </div>
        <div className="bg-white py-4 p-1 my-2 flex border border-gray-200 rounded">
          <div className="border-r pr-6">
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="weekly"
                name="weekly"
                label="weekly"
                readOnly
                checked={!!(userData.recurring.rate === "weekly")}
                className="  mx-1 outline-non text-gray-800"
              />
              <p>Weekly</p>
            </div>

            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="noRecurr"
                name="noRecurr"
                label="noRecurr"
                readOnly
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
                value="monday"
                name="monday"
                id="monday"
                readOnly
                checked={!!userData.recurring.days.includes("monday")}
                className="mx-1 outline-non text-gray-800"
              />
              <p>Monday</p>
            </div>
            <div className=" flex space-x-4 items-center">
              <input
                type="checkbox"
                value="tuesday"
                name="tuesday"
                id="tuesday"
                readOnly
                checked={!!userData.recurring.days.includes("tuesday")}
                className=" mx-1 outline-non text-gray-800"
              />
              <p>Tuesday</p>
            </div>
            <div className=" flex space-x-4 items-center">
              <input
                type="checkbox"
                value="wednesday"
                name="wednesday"
                id="wednesday"
                readOnly
                checked={!!userData.recurring.days.includes("wednesday")}
                className=" mx-1 outline-non text-gray-800"
              />
              <p>Wednesday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="thursday"
                name="thursday"
                readOnly
                checked={!!userData.recurring.days.includes("thursday")}
                className="mx-1 outline-non text-gray-800"
              />
              <p>Thursday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="friday"
                name="friday"
                readOnly
                checked={!!userData.recurring.days.includes("friday")}
                className=" mx-1 outline-non text-gray-800"
              />
              <p>Friday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="saturday"
                name="saturday"
                readOnly
                checked={!!userData.recurring.days.includes("saturday")}
                className="mx-1 outline-non text-gray-800"
              />
              <p>Saturday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="sunday"
                name="sunday"
                readOnly
                checked={!!userData.recurring.days.includes("sunday")}
                className="mx-1 outline-non text-gray-800"
              />
              <p>Sunday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
