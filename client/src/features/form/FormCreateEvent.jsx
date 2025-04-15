import React from "react";
import { useFormContext } from "contexts/FormContext";
import { useAuthContext } from "contexts/AuthContext";

export default function FormCreateEvent() {
  const auth = useAuthContext();
  const { formData, setFormData, formCreateEventErrors } = useFormContext();

  // This updates the form data's in the context
  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
      discordName: auth.user?.displayName,
    }));
  };

  return (
    <div className="flex flex-col">
      {formCreateEventErrors.map((error, index) => {
        return (
          <div className="alert alert-error shadow-lg text-red-700" key="index">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        );
      })}

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Title
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={formData["title"] || ""}
            name="title"
            placeholder="Title"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Description
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <textarea
            type="text"
            onChange={handleChange}
            value={formData["description"] || ""}
            name="description"
            placeholder="Description"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
            rows="8"
          ></textarea>
        </div>
      </div>

      {/* LOCATION FIELD */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Location
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={formData["location"] || ""}
            name="location"
            placeholder="Location"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
          Discord Name
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={auth.user?.displayName || ""}
            name="discordName"
            disabled={true}
            placeholder="Discord Name"
            className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
