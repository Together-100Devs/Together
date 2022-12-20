import { useState, useEffect } from "react";

// Form components
import { FormMoverContext } from "./contexts/FormMoverContext";
import FormMover from "./FormMover";
import FormMoverControl from "./FormMoverControl";
import FormCreateEvent from "./FormCreateEvent";
import FormScheduleEvent from "./FormScheduleEvent";
import FormConfirm from "./FormConfirm";
import FormSuccess from "./FormSuccess";

// Import data via API for some reason?
import DataService from "services/dataService";


import { generateRecurringDatesArray } from "utilities/calendar";

// This is the code for the form where you add events to the calendar
const UserForm = () => {

  // Keep track of what "step" we're on in the form  
  const [currentStep, setCurrentStep] = useState(1);

  // This keeps track of the data the user is creating while the form is being filled out
  const [userData, setUserData] = useState({
    recurring: { rate: "noRecurr", days: [] },
  });

  // The userData's structure should be something like this:
  /* 
  userData = {
    (From FormCreateEvent)
    title,
    description,
    initialDate,
    finalDate,

    (From FormScheduleEvent)
    location,
    startTime,
    endTime,

    (From FormRecurringDates)
    recurring: {
      rate,
      days
    }
  }
  
   */

  // This is what the data is copied into
  const [finalData, setFinalData] = useState([]);

  // Strings for steps present in the form, steps[currentStep] --> string
  const steps = ["Description", "Schedule", "Confirm", "Success"];

  // Called to display different parts of the form based on the latest step.
  const displayStep = step => {
    switch (step) {
      case 1:
        // Fields: Title, Description, Start Date, Final Date, Discord Username
        return <FormCreateEvent />;
      case 2:
        // Fields: Location, Start Time, End Time, FormRecurringDates values: (Recurrence Rate, Days of Week to repeat)
        return <FormScheduleEvent />;
      case 3:
        // Shows all of the form's data for the user to confirm
        return <FormConfirm />;
      case 4:
        // Displays a "Success!" message when completed.
        return <FormSuccess />;
      default:
    }
  };
  
  // 
  const handleClick = async direction => {
    let newStep = currentStep; // Extract step as temporary value from currentStep state
    direction === "next" ? newStep++ : newStep--; // If the direction we're going in the 
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep); // 

    if (newStep === 4) {
      const recurringDates = generateRecurringDatesArray(userData);
      const data = JSON.stringify({
        ...userData,
        dates: recurringDates
      })
      await DataService.create({ data: data })
    };
  };

  // Date and Time Formats
  // returned dates = "2022-12-01"  returned times = "20:33" 


  // function concatDateTime (date, time) {
  //   return `${date.split("T")[0]}T${time.split("T")[1]}`;
  // }

  // console.log(concatDateTime("2021-05-25T09:50:40.603Z", Date.UTC("2021-05-12T11:52:40.603Z")));
  // console.log(concatDateTime("2021-05-25T09:50:40.603Z", "2021-05-12T11:52:40.603Z"));



  return (
    <div>
      <div className="container horizontal mt-5">
        <FormMover steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          {/* A wrapper for a form that is split up into parts that can be iterated over: */}
          <FormMoverContext.Provider
            value={{
              // Parameters for setting the user data i guess?
              userData,
              setUserData,
              finalData,
              setFinalData,
            }}
          >
            {/* This part displays the actual "Form" based on what step we're on: */}
            {displayStep(currentStep)}
          </FormMoverContext.Provider>
        </div>
      </div>
      <div>
        {/* if currentStep isn't the last step (in the case of a bug/edge case), FormMoverControl won't render */}
        {/* This makes sure that the steps don't keep counting in the mover control */}
        {currentStep !== steps.length && (
          <FormMoverControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </div>
  );
};

export default UserForm;
