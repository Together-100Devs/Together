import { useFormContext } from "contexts/FormContext";
import FormMover from "./FormMover";
import FormMoverControl from "./FormMoverControl";
import FormCreateEvent from "./FormCreateEvent";
import FormScheduleEvent from "./FormScheduleEvent";
import FormConfirm from "./FormConfirm";
import FormSuccess from "./FormSuccess";

const UserForm = () => {
  const { currentStep, totalSteps } = useFormContext();

  const displayStep = step => {
    switch (step) {
      case 1:
        return <FormCreateEvent />;
      case 2:
        return <FormScheduleEvent />;
      case 3:
        return <FormConfirm />;
      case 4:
        return <FormSuccess />;
      default:
    }
  };

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <FormMover />

        <div className="my-10 p-10 ">
            {displayStep(currentStep)}
        </div>
      </div>
      <div>
        {currentStep !== totalSteps.length && (
          <FormMoverControl />
        )}
      </div>
    </div>
  );
};

export default UserForm;