import { useState } from "react";
import { generateRecurringDatesArray } from "utilities/calendar";
import DataService from "services/dataService";

const useProvideForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    recurring: { rate: "noRecurr", days: [] },
    completed: false,
  });
  const totalSteps = ["Description", "Schedule", "Confirm", "Success"];

  
  const checkCompleted = () =>{
    const formDataExpectedKeys = ['recurring', 'completed', 'title', 'discordName', 'description', 'initialDate', 'finalDate']

    const formDataCurrentKeys = Object.keys(formData)
    
    console.log(formDataCurrentKeys.toString(),formDataExpectedKeys.toString())
    
    if(formDataExpectedKeys.toString() !== formDataCurrentKeys.toString())
    {
      return false
    }
  
    

    // title != null
    // description != null
    
    // initialDate != null
    // initialDate cannot be more than 90 days before finalDate
    // initialDate cannot be after finalDate
    // initialDate cannot be before today
    // initialDate cannot be after 12/31/2023
    // NOTE: initialDate's minimum of today will stay hardcoded
    // NOTE: initialDate's maximum will stay 12/31/2023
    
    // finalDate != null
    // finalDate cannot be more than 90 days after Start Date
    // finalDate cannot be before initialDate
    // finalDate cannot be before today
    // finalDate cannot be after 12/31/2023
    // NOTE: finalDate's minimum of today will stay hardcoded
    // NOTE: finalDate's maximum will stay 12/31/2023
    
    // discordName != null
    
    
    //  PAGE 2  FormScheduleEvent.js
    
    // location != null
    
    // startTime != null
    // startTime not AFTER endTime
    // endTime != null
    // endTime not BEFORE startTime
    
    // recurring.rate != null
    // if recurring.rate != "noRecurr", recurring.days != null
    // else if recurring.rate === "noRecurr", recurring.days === null or empty

  }

  const handleNewStep = async direction => {
    console.log(checkCompleted())
    const newStep = direction === "next" ? currentStep + 1: currentStep - 1;

    if (newStep > 0 && newStep <= totalSteps.length) {
      setCurrentStep(newStep);
    }

    if(newStep === 1){console.log(newStep)}

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