import React from "react";
import { useFormContext } from "contexts/FormContext";

const FormMoverControl = () => {
  const { formData, currentStep, totalSteps, handleNewStep, setFormCreateEventErrors, formCreateEventErrors } = useFormContext();

  const handleNextButton = () => {

    // Run a bunch of tests for FormCreateEvent.
    // For each test that returns an error, save a value
    // Return the values to FormCreateEventErrors

    switch (currentStep) {
      case 1:
        //aaa
        const errorArray = [];

        // Check if any values are undeclared
        // This code is no londer needed
        // if (Object.keys(formData).toString() !== ['recurring', 'completed', 'title', 'discordName', 'description', 'location'].toString()) {
        //   console.log("Error: Undeclared Value");
        // }

        console.log("\n\nChecking Values:");

        // Check if any values are empty string, null, undefined, and/or less than 2 characters
        // Side note: This is the only case where you'd ever want to use == instead of ===
        if (formData['title'] === "" || formData['title'] == null) {
          console.log("Error: Missing 'title' field value");
          errorArray.push('Title field must at least be two characters');
        } else {
          console.log("'title' field value is valid");
          errorArray.remove('Title field must at least be two characters');
        }

        if (formData['description'] === "" || formData['description'] == null) {
          console.log("Error: Missing 'description' field value");
          errorArray.push('Description field must at least be two characters');
        } else {
          console.log("'description' field value is valid");
          errorArray.remove('Description field must at least be two characters');
        }

        if (formData['location'] === "" || formData['location'] == null) {
          console.log("Error: Missing 'location' field value");
          errorArray.push('Location field must at least be two characters');
        } else {
          console.log("'location' field value is valid");
          errorArray.remove('Location field must at least be two characters');
        }

        if (formData['discordName'] === "" || formData['discordName'] == null) {
          console.log("Error: Missing 'discordName' field value");
          errorArray.push('Discord username field must at least be two characters');
        } else {
          console.log("'discordName' field value is valid");
          errorArray.remove('Discord username field must at least be two characters');
        }

        console.log("Errors at fields:", errorArray);
        console.log("Testing concluded.");

        setFormCreateEventErrors(errorArray);
      // console.log(formCreateEventErrors);
      default:
        console.log("helo");

    }
    // Only if none of the tests return an error do we allow currentStep to iterate
    // By running handleNextStep.

    handleNewStep("next");
  }

  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* back button */}
      <button
        onClick={() => handleNewStep()}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor cursor-not-allowed" : ""
          }`}
      >
        Back
      </button>

      {/* next button */}
      <button
        onClick={() => handleNextButton()}
        className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        {currentStep === totalSteps.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default FormMoverControl;