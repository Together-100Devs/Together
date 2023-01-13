import { useState } from "react";
import DataService from "services/dataService";
import { dateToTimestamp } from "utilities/calendar";

const useProvideForm = () => {
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
      const { initialDate, startTime, finalDate, endTime, ...rest } = formData;
      // start and end timestamps of the earliest possible event
      const firstEventStart = dateToTimestamp(initialDate, startTime);
      const firstEventEnd = dateToTimestamp(initialDate, endTime);
      // start timestamp of the last possible event
      const lastEventStart = dateToTimestamp(finalDate, startTime);
      // Event data to be sent to the backend
      const event = { ...rest, firstEventStart, firstEventEnd, lastEventStart };

      // Axios automatically serializes object to JSON
      // https://masteringjs.io/tutorials/axios/post-json
      await DataService.create(event);
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
