import { useFormContext } from "contexts/FormContext";
import FormMover from "./FormMover";
import FormMoverControl from "./FormMoverControl";
import FormCreateEvent from "./FormCreateEvent";
import FormScheduleEvent from "./FormScheduleEvent";
import FormConfirm from "./FormConfirm";
import FormSuccess from "./FormSuccess";
import { useFormModalContext } from "contexts/FormModalContext";

// This is the code for the form where you add events to the calendar
const UserForm = () => {
  
  // Specifically extract the currentStep and totalSteps from userFormContext
  const { currentStep, totalSteps } = useFormContext();

  const modal = useFormModalContext();


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

  return (
    <div className="md:w mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <div className="flex flex-col items-center"> 
          <button
            className="w-auto h-12 mt-5 px-2 border-solid border-2 border-gray outline-none rounded font-semibold text-xl hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300"
            onClick={modal.handleClose}
          >
            Close
          </button>
        </div>
        <FormMover />

        <div className="my-1 p-5">
            {displayStep(currentStep)}
        </div>
      </div>
      <div>
        {/* if currentStep isn't the last step (in the case of a bug/edge case), FormMoverControl won't render */}
        {/* This makes sure that the steps don't keep counting in the mover control */}
        {currentStep !== totalSteps.length && (
          <FormMoverControl />
        )}
      </div>
    </div>
  );
};

export default UserForm;