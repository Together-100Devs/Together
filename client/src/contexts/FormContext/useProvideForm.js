import { useState } from "react";
import { generateRecurringDatesArray } from "utilities/calendar";
import DataService from "services/dataService";
import { useEventsContext } from "contexts/EventsContext";

const useProvideForm = () => {
  const { setEvents } = useEventsContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    recurring: { rate: "noRecurr", days: [] },
  });
  const totalSteps = ["Description", "Schedule", "Confirm", "Success"];

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
      try {
        await DataService.create({ data: data });
      } catch (err) {
        console.error(err)
        return
      }

      const response = await DataService.getAll()
      setEvents(response.data);
    }
  };

  return {
    currentStep,
    totalSteps,
    formData,
    handleNewStep,
    setFormData,
  };
};

export default useProvideForm;
