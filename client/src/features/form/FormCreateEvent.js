import { useContext } from "react";
import { FormMoverContext } from "./contexts/FormMoverContext";
import { Context } from "contexts/Context";
import { format, add, sub, parseISO } from 'date-fns';
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

  useEffect(() => { // Debug code
    userData["initialDate"] ? console.log("End Date:", format(add(parseISO(userData["initialDate"]), { days: 90 }), 'yyyy-MM-dd')) : console.log("initialDate DNE");
  }, [userData])

  const calculateStartDateMinimum = () => {
    const today = new Date(); // establish "today" as a string value

    if (!userData["finalDate"]) { // if endDate does not exist, startDate's minimum is today
      return format(today, 'yyyy-MM-dd');

    } else { // if endDate exists, startDate cannot be more than 90 days before endDate

      // OR it defaults to newDate if the date 90 days before endDate is before or equal to newDate
      const NinetyDaysBefore = sub(parseISO(userData["finalDate"]), {days : 90});

      if (NinetyDaysBefore <= today) { // NOTE: can you compare dates this way? who knows.
        return format(today, 'yyyy-MM-dd');
      } else {
        return format(NinetyDaysBefore, 'yyyy-MM-dd');
      }

    }
  }

  // This prevents the end date from being set to something before the start date
  const calculateEndDateMinimum = () => {
    if (userData["startDate"] !== undefined) { // start date exists, end date minimum = start date
      return format(userData["startDate"], 'yyyy-MM-dd')

    } else { // start date does not exist in any case, end date minimum = today
      return format(new Date(), 'yyyy-MM-dd');
    }
  }

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
        {/* Note for user to understand the date boundaries. Added margin to seperate the date section from the event info */}
        <p className="text-xs mt-10">Note: Start Date and End Date cannot be more than 90 days apart, and both must be in 2022 or 2023.</p>
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
            min={calculateStartDateMinimum()}
            // If end date exists, then the start date's max = that end date, otherwise max = last day of 2023
            // this prevents the start date being set to anything after the end date
            max={userData["finalDate"] ? format((parseISO(userData["finalDate"])), 'yyyy-MM-dd') : '2023-12-31'}
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
            // If start date exists, then the minimum for the end date is start date, otherwise the minimum end date is today
            min={userData["initialDate"] ? userData["initialDate"] : format(new Date(), 'yyyy-MM-dd')}
            // If start date exists, then the end date max = start date + 90 days, otherwise end date max = last day of 2023
            max={userData["initialDate"] ? format(add(parseISO(userData["initialDate"]), { days: 90 }), 'yyyy-MM-dd') : '2023-12-31'}
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
