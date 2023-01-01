import { useState } from "react";
import { generateRecurringDatesArray } from "utilities/calendar";
import DataService from "services/dataService";

const useProvideForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = ["Description", "Schedule", "Confirm", "Success"];
  
  const [formData, setFormData] = useState({
    recurring: { rate: "noRecurr", days: [] },
    completed: false,
  });

  // form errors
  const [formCreateEventErrors, setformCreateEventErrors] = useState([]);
  
  const checkCompleted = () =>{

  }

  const validateFormCreateEventData = () => {

    // STEP 1:

    // FormMoverControl.js:
    // Add a new function to the "Next" button in FormMoverControl.js
    // Upon clicking it:

    // If currentStep === 1
      // Run a bunch of tests for FormCreateEvent.
      // For each test that returns an error, save a value
        // Return the values to FormCreateEventErrors
      // Only if none of the tests return an error do we allow currentStep to iterate
      // By running handleNextStep.
      // TEST THIS VIA THIS CONTEXT

    // STEP 2
    // In FormCreateEvent.js, consume FormCreateEventErrors from this context
    // Have a useEffect function that displays errors based on which ones are present
    // To start, we will just print all the out to either the console or to the TOP AND BOTTOM of the form in view of the next buttom

    // STEP 3
    // Research better ways to do error messages: maybe show them next to each form field?
    // Literally Google "React Form Error Message Example" or something

    // IDEA 1:
      // Make a "FormError.js" component that displays an error for their respective field
      // Have functions in FormCreateEvent that say something like
      // detectError(isHidden, errorMessage) <-- Displays the error message in the FormError.js' format IF ishidden is true 
      // For each error type in FormCreateEventErrors, you will need to do a ... .includes(), then NOT "hidden", else "hidden" in CSS
  }

  const handleNewStep = async direction => {
    // console.log(checkCompleted()) // Debug
    const newStep = direction === "next" ? currentStep + 1: currentStep - 1;

    if (newStep > 0 && newStep <= totalSteps.length) {
      setCurrentStep(newStep);
    }

    // if(newStep === 1){console.log(newStep)}

    // Submit form to server
    if (newStep === 4) {
      const recurringDates = generateRecurringDatesArray(formData);
      const data = JSON.stringify({
        ...formData,
        dates: recurringDates
      })
      await DataService.create({ data: data })
    }
  }

  return {
    currentStep,
    totalSteps,
    formData,
    handleNewStep,
    setFormData
  };
};

export default useProvideForm;