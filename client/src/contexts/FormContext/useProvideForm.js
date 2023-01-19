import { useState } from "react";
import { generateRecurringDatesArray } from "utilities/calendar";
import DataService from "services/dataService";
import { useEventsContext } from "contexts/EventsContext";

const useProvideForm = () => {
  const { addEvents } = useEventsContext();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = ["Description", "Schedule", "Confirm", "Success"];
  
  const [formData, setFormData] = useState({
    recurring: { rate: "noRecurr", days: [] },
    completed: false,
  });

  // form errors
  const [formCreateEventErrors, setFormCreateEventErrors] = useState([]);
  const [formScheduleEventErrors, setFormScheduleEventErrors] = useState([]);
  
  const handleNewStep = async direction => {
    const newStep = direction === "next" ? currentStep + 1 : currentStep - 1;

    if (newStep > 0 && newStep <= totalSteps.length) {
      setCurrentStep(newStep);
    }

    // Submit form to server
    if (newStep === 4) {
      const recurringDates = generateRecurringDatesArray(formData);
      const { title, description, location } = formData;

      const data = JSON.stringify(
        recurringDates.map(date => ({
          title,
          description,
          location,
          ...date,
        }))
      );

      let response;
      try {
        response = await DataService.create({ data: data });
      } catch (err) {
        console.error(err)
        return
      }

      const events = response.data.events
      addEvents(events)
    }
  };

  return {
    currentStep,
    totalSteps,
    formData,
    formCreateEventErrors,
    formScheduleEventErrors,
    handleNewStep,
    setFormData,
    setFormCreateEventErrors,
    setFormScheduleEventErrors
  };
};

export default useProvideForm;
