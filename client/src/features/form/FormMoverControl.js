import React from "react";

// This functional component handles what buttons show up depending on the step 
const FormMoverControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* back button */}
      <button
        onClick={() => handleClick()}
        // Disable back button on 1st step
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>
      {/* next button */}
      <button
        onClick={() => handleClick("next")}
        className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        {/* Change "Next" button to "Submit" on last page */}
        {currentStep === steps.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default FormMoverControl;
