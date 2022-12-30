import React from "react";
import { useFormContext } from "contexts/FormContext";
import { useAuthContext } from "contexts/AuthContext";

// This Component gets the Title, Description, and the start/end Dates for the event
export default function FormCreateEvent() {
  const auth = useAuthContext();
  const { formData, setFormData } = useFormContext();

  const handleChange = e => {

    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value, discordName: auth.user?.displayName }));
  };

  useEffect(() => { // Debug code
    userData["initialDate"] ? console.log("End Date:", format(add(parseISO(userData["initialDate"]), { days: 90 }), 'yyyy-MM-dd')) : console.log("initialDate DNE");
  }, [userData])

  // This function sets initialDate's minimum to either today
  const calculateStartDateMinimum = () => {
    const today = new Date(); // get date for today
    const NinetyDaysBefore = sub(parseISO(userData["finalDate"]), {days : 90}); // get date 90 days before final date

    // If the finalDate exists AND 90 days before finalDate is LATER than today, 
    // initialTime's minimum = 90 days before finalDate
    if (NinetyDaysBefore > today && userData["finalDate"]) { 
      return format(NinetyDaysBefore, 'yyyy-MM-dd');
    }

    // if finalDate is not yet set, or 90 days before finalDate would be before or equal to today,
    // initialTime's minimum = today
    return format(today, 'yyyy-MM-dd');
  }

  /* Pseudo 
  
   */




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
            value={formData["title"] || ""}
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
            value={formData["description"] || ""}
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
            value={formData["initialDate"] || ""}
            name="initialDate"
            placeholder="Start Date"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
            required
            // Some more complex logic is needed to set the startDate minimum, so we moved it into a function
            // so that we don't have to use a verbose ternary operator
            min={calculateStartDateMinimum()}
            // If finalDate exists, then the initialDate's max = that finalDate, otherwise max = last day of 2023
            // this prevents the initialDate being set to anything after the finalDate
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
            value={formData["finalDate"] || ""}
            name="finalDate"
            placeholder="endDate"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
            required
            // If initialDate exists, then the minimum finalDate is initialDate, otherwise the minimum finalDate is today
            // This prevents the finalDate from being set to something before the initialDate
            min={userData["initialDate"] ? userData["initialDate"] : format(new Date(), 'yyyy-MM-dd')}
            // If initialDate exists, then finalDate max = initialDate + 90 days, otherwise max = last day of 2023
            // This prevents finalDate from being 90 days beyond initialDate AND from being beyond 2022-2023
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
            value={auth.user?.displayName || ""}
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