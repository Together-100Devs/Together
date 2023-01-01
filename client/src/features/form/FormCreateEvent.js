import React, { useEffect } from "react";
import { useFormContext } from "contexts/FormContext";
import { useAuthContext } from "contexts/AuthContext";
import { parseISO, format, add, sub } from "date-fns";

// This Component gets the Title, Description, and the start/end Dates for the event
export default function FormCreateEvent() {

  const { formData, setFormData } = useFormContext();
  // const {formCompleted, setFormCompleted} = useState();

  const handleChange = e => {

    const { name, value } = e.target;

    // TODO: These are devs notes, delete this line and possibly the rest before PRing
    // Using an anonymous function like so allows us to get the previous state of the data and extend it
    // [name]: value overrides the value at the [name] on which handleChange is called
    // e.g. if [name] is "title" in the form input, the value of "title" gets changed in formData
    // the data is then also extended by your Discord username
    setFormData(prevFormData => ({ ...prevFormData, [name]: value, discordName: auth.user?.displayName }));

    // Next button stays greyed out/disabled by default, and as long as any field is empty
    // and also if a date is out of range, etc.

    // TODO: Ask Caleb about making end date just one or two years from now in the Issue thread.
  };

  useEffect(() => { // Debug code
    // // formData["initialDate"] ? console.log("End Date:", format(add(parseISO(formData["initialDate"]), { days: 90 }), 'yyyy-MM-dd')) : console.log("initialDate DNE");
    console.log(formData);
  }, [formData])

  // This function sets initialDate's minimum to either today
  const calculateStartDateMinimum = () => {
    const today = new Date(); // get date for today
    const NinetyDaysBefore = sub(parseISO(formData["finalDate"]), {days : 90}); // get date 90 days before final date

    // If the finalDate exists AND 90 days before finalDate is LATER than today, 
    // initialTime's minimum = 90 days before finalDate
    if (NinetyDaysBefore > today && formData["finalDate"]) { 
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
            required
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
            required
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
            max={formData["finalDate"] ? format((parseISO(formData["finalDate"])), 'yyyy-MM-dd') : '2023-12-31'}
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
            min={formData["initialDate"] ? formData["initialDate"] : format(new Date(), 'yyyy-MM-dd')}
            // If initialDate exists, then finalDate max = initialDate + 90 days, otherwise max = last day of 2023
            // This prevents finalDate from being 90 days beyond initialDate AND from being beyond 2022-2023
            max={formData["initialDate"] ? format(add(parseISO(formData["initialDate"]), { days: 90 }), 'yyyy-MM-dd') : '2023-12-31'}
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