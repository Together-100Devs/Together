import { useContext } from "react";
import { FormMoverContext } from "./contexts/FormMoverContext";
import { Context } from "contexts/Context";
import { format, add, parseISO } from 'date-fns';
import { useEffect } from "react";

// This Component gets the Title, Description, and the start/end Dates for the event
export default function FormCreateEvent() {

  // This useContext hook syncs userData across UserForm and its sub-components
  const { userData, setUserData } = useContext(FormMoverContext);

  // This useContext hook passes in the Discord username of the logged in Discord user (in this case), it might do other things for other parts.
  const [context] = useContext(Context)

  // When something on the form changes, modify userData to have the new stuff from the form
  const handleChange = e => {
    const { name, value } = e.target;
    
    // TODO: move this note to documentation
    // Debug testing what context even is, turns out it's the Discord User data.
    // console.log(context);
    
    // Set the userData
    setUserData({ ...userData, [name]: value, discordName: context.user?.displayName });
  };

  useEffect(()=>{ // Debug code
    userData["initialDate"] ? console.log(format(add(parseISO(userData["initialDate"]), {days: 90}), 'yyyy-MM-dd')) : console.log("initialDate DNE");

    // Idea: fail-safe where if start date goes back past the 90 day limit AFTER setting start and end date
    // We auto-set the end date too to prevent an exploit
  }, [userData])

  return (
    // TITLE OF EVENT FIELD
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Title
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={userData["title"] || ""} // Blank by default, or equal to whatever the userData's value is (same for other fields)
            name="title"
            placeholder="Title"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>

      {/* DESCRIPTION OF EVENT FIELD */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Description
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={userData["description"] || ""}
            name="description"
            placeholder="Description"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>

      {/* START DATE OF EVENT */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Start Date
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="date" // Date input type
            onChange={handleChange}
            value={userData["initialDate"] || ""}
            name="initialDate"
            placeholder="Start Date"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
            required 
            min={format(new Date(), 'yyyy-MM-dd')}
            max='2023-12-31'
          />
        </div>
      </div>

      {/* END DATE OF EVENT */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          End Date
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="date"
            onChange={handleChange}
            value={userData["finalDate"] || ""}
            name="finalDate"
            placeholder="endDate"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
            required 
            min={format(new Date(), 'yyyy-MM-dd')}
            // If start date exists, then the end date max = start date + 90 days, otherwise end date max = last day of 2023
            max = {userData["initialDate"] ? format(add(parseISO(userData["initialDate"]), {days: 90}), 'yyyy-MM-dd') : '2023-12-31'}
          />
        </div>
      </div>

      {/* DISCORD USERNAME FIELD */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Discord Name
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={context.user?.displayName || ""}
            name="discordName"
            disabled={true}
            placeholder="Discord Name"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
