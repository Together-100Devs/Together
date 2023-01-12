import { useState } from "react";
import DataService from "services/dataService";

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
      console.log(JSON.stringify(formData));
      // Axios automatically serializes object to JSON
      // https://masteringjs.io/tutorials/axios/post-json
      await DataService.create(formData);
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
