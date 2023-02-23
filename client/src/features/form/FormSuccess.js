// This component is meant to be shown when the event is successfully been added to the calendar.
//Import form context
import { useFormContext } from "contexts/FormContext";

export default function FormSuccess() {
  const form = useFormContext();
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="pb-5">Congratulations!</div>
        <div className="text-teal-700 text-lg font-semibold uppercase">
          Your Event has been added.
        </div>

        {/* A button to add another event if so desired */}
        <button
          onClick={() => {
            form.setFormData({
              recurring: { rate: "noRecurr", days: [] },
            });
            form.setCurrentStep(1);
          }}
          className="h-10 mt-10 px-5 font-semibold text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100"
        >
          New Event
        </button>
      </div>
    </div>
  );
}
