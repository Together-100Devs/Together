import React, {useState} from "react";
import { useFormContext } from "contexts/FormContext";
import { parseISO, format, add, sub } from "date-fns";

const FormMoverControl = () => {
  const { formData, currentStep, totalSteps, handleNewStep, setFormCreateEventErrors, setFormScheduleEventErrors } = useFormContext();

  const [errorArray, setErrorArray] = useState([]);

  function checkInputError(input) {
    if (formData[input] === "" || formData[input] == null) {
      console.log(`Error: Missing ${input} field value`);
      errorArray.push(`Error: Missing ${input} field can't be empty`);
    }
  }

  const handleNextButton = () => {

    // Run a bunch of tests for each form page.
    // For each test that returns an error, save a value.
    // Return the values to the form page"s component.


    setErrorArray([]);

    console.log("CHECKING STEP: ", currentStep);

    switch (currentStep) {
      case 1:

        console.log("\n\nChecking Values:", formData);

        // Check if any values are empty string, null, undefined, and/or less than 2 characters
        // Side note: This is the only case where you"d ever want to use == instead of ===

        checkInputError("title");
        checkInputError("description");
        checkInputError("location");

        console.log("Errors:", errorArray);
        console.log("Testing concluded.");

        setFormCreateEventErrors(errorArray);
        break;

      // 2nd page - FormScheduleEvent
      case 2:

        console.log("\n\nChecking Values:");

        // Empty Field Value Tests
        if (formData["initialDate"] === "" || formData["initialDate"] == null) {
          console.log("Error: Missing start date field value");
          errorArray.push("Start date field must not be empty");
        } else {
          console.log("Start date field value is valid");
          const index = errorArray.indexOf("Start date field must not be empty")
          if (index > -1) { // only splice array when item is found
            errorArray.splice(index, 1); // 2nd parameter means remove one item only
          }
        }

        if (formData["finalDate"] === "" || formData["finalDate"] == null) {
          console.log("Error: Missing End date field value");
          errorArray.push("End date field must not be empty");
        } else {
          console.log("End date field value is valid");
          const index = errorArray.indexOf("End date field must not be empty")
          if (index > -1) { // only splice array when item is found
            errorArray.splice(index, 1); // 2nd parameter means remove one item only
          }
        }

        if (formData["startTime"] === "" || formData["startTime"] == null) {
          console.log("Error: Missing Start time field value");
          errorArray.push("Start time field must not be empty");
        } else {
          console.log("Start time field value is valid");
          const index = errorArray.indexOf("Start time field must not be empty")
          if (index > -1) { // only splice array when item is found
            errorArray.splice(index, 1); // 2nd parameter means remove one item only
          }
        }

        if (formData["endTime"] === "" || formData["endTime"] == null) {
          console.log("Error: Missing End time field value");
          errorArray.push("End time field must not be empty");
        } else {
          console.log("End time field value is valid");
          const index = errorArray.indexOf("End time field must not be empty")
          if (index > -1) { // only splice array when item is found
            errorArray.splice(index, 1); // 2nd parameter means remove one item only
          }
        }


        // Start Date & End Date Cannot be more than 90 days apart

        // get date 90 days before final date

        const NinetyDaysBeforeFinalDate = sub(parseISO(formData["finalDate"]), { days: 90 });
        // console.log(formData["initialDate"]);
        // console.log(NinetyDaysBeforeFinalDate)
        // console.log("Is start date 90 days before end date", parseISO(formData["initialDate"]) < NinetyDaysBeforeFinalDate);
        if (parseISO(formData["initialDate"]) < NinetyDaysBeforeFinalDate) {
          console.log("Error: Start date and End date cannot be more than 90 days apart");
          errorArray.push("Start date and End date cannot be more than 90 days apart");
        } else {
          console.log("Start date and End date difference is valid");
          const index = errorArray.indexOf("Start date and End date cannot be more than 90 days apart")
          if (index > -1) { // only splice array when item is found
            errorArray.splice(index, 1); // 2nd parameter means remove one item only
          }
        }

        // Start Date cannot be after End Date, vica versa
        if (parseISO(formData["finalDate"]) < parseISO(formData["initialDate"])) {
          console.log("Error: Start date cannot be after End date");
          errorArray.push("Error: Start date cannot be after End date");
        }
        
        /*  else {
          console.log("Start date and End date difference is valid");
          const index = errorArray.indexOf("Start date and End date cannot be more than 90 days apart")
          if (index > -1) { // only splice array when item is found
            errorArray.splice(index, 1); // 2nd parameter means remove one item only
          }
        } */

        // "Weekly" Recurring Event MUST include at least on day of week
        if (formData["recurring"]["rate"] === "weekly" && formData["recurring"]["days"].length === 0) {
          console.log("Weekly recurring Event MUST include at least on day of week");
          errorArray.push("Weekly recurring Event MUST include at least on day of week");
        }
        // print an error

        console.log("Errors:", errorArray);
        console.log("Testing concluded.");

        setFormScheduleEventErrors(errorArray);
        break;

      default:
        break;

    }
    // Only if none of the tests return an error do we allow currentStep to iterate
    // By running handleNextStep.

    if (errorArray.length <= 0) {
      handleNewStep("next");
    }
  }

  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* back button */}
      <button
        onClick={() => handleNewStep()}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor cursor-not-allowed" : ""
          }`}
      >
        Back
      </button>

      {/* next button */}
      <button
        onClick={() => handleNextButton()}
        className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        {currentStep === totalSteps.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default FormMoverControl;