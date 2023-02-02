import React from "react";
import { useFormContext } from "contexts/FormContext";

// This components displays all of the form data for the user to confirm 
export default function FormConfirm() {
  const { formData } = useFormContext();

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Title
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{formData["title"]}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Description
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{formData["description"]}</p>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
            Initial Date
          </div>
          <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
            <p>{formData["initialDate"]}</p>
          </div>
        </div>

        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
            End Date
          </div>
          <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
            <p>{formData["finalDate"]}</p>
          </div>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Discord Name
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{formData["discordName"] || ""}</p>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Location
        </div>
        <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
          <p>{formData["location"]}</p>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
            Start Time
          </div>
          <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
            <p>{formData["startTime"]}</p>
          </div>
        </div>
    
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
            End Time
          </div>
          <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
            <p>{formData["endTime"]}</p>
          </div>
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
                checked={!!(formData.recurring.rate === "weekly")}
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
                checked={!!(formData.recurring.rate === "noRecurr")}
                className="  mx-1 outline-non text-gray-800"
              />
              <p>No Recurring</p>
            </div>
          </div>
          <div className=" mx-7 ">
            <div className="  flex space-x-4 items-center">
              <input
                type="checkbox"
                value="1"
                name="Monday"
                id="Monday"
                readOnly
                checked={!!formData.recurring.days.includes("1")}
                className="mx-1 outline-non text-gray-800"
              />
              <p>Monday</p>
            </div>
            <div className=" flex space-x-4 items-center">
              <input
                type="checkbox"
                value="2"
                name="Tuesday"
                id="Tuesday"
                readOnly
                checked={!!formData.recurring.days.includes("2")}
                className=" mx-1 outline-non text-gray-800"
              />
              <p>Tuesday</p>
            </div>
            <div className=" flex space-x-4 items-center">
              <input
                type="checkbox"
                value="3"
                name="Wednesday"
                id="Wednesday"
                readOnly
                checked={!!formData.recurring.days.includes("3")}
                className=" mx-1 outline-non text-gray-800"
              />
              <p>Wednesday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="4"
                name="Thursday"
                readOnly
                checked={!!formData.recurring.days.includes("4")}
                className="mx-1 outline-non text-gray-800"
              />
              <p>Thursday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="5"
                name="Friday"
                readOnly
                checked={!!formData.recurring.days.includes("5")}
                className=" mx-1 outline-non text-gray-800"
              />
              <p>Friday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="6"
                name="Saturday"
                readOnly
                checked={!!formData.recurring.days.includes("6")}
                className="mx-1 outline-non text-gray-800"
              />
              <p>Saturday</p>
            </div>
            <div className="flex space-x-4 items-center">
              <input
                type="checkbox"
                value="0"
                name="Sunday"
                readOnly
                checked={!!formData.recurring.days.includes("0")}
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