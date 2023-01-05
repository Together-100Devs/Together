import React from "react";
import { useFormContext } from "contexts/FormContext";
import { useAuthContext } from "contexts/AuthContext";

export default function FormCreateEvent() {

  const auth = useAuthContext();
  const { formData, setFormData, formCreateEventErrors } = useFormContext();
  // const {formCompleted, setFormCompleted} = useState();

  useEffect(() => {
    console.log("Got errors for formCreatEvent:", formCreateEventErrors);
  }, [formCreateEventErrors]);

  const handleChange = e => {

    const { name, value } = e.target;

    // TODO: These are devs notes, delete this line and possibly the rest before PRing
    // Using an anonymous function like so allows us to get the previous state of the data and extend it
    // [name]: value overrides the value at the [name] on which handleChange is called
    // e.g. if [name] is "title" in the form input, the value of "title" gets changed in formData
    // the data is then also extended by your Discord username
    setFormData(prevFormData => ({ ...prevFormData, [name]: value, discordName: auth.user?.displayName }));

    // Next button stays greyed out/disabled by default, and as long as any field is empty
    // and also if a date is out of range, etc.

    // TODO: Ask Caleb about making end date just one or two years from now in the Issue thread.
    const auth = useAuthContext();
    const { formData, setFormData } = useFormContext();

    console.log(formData)
    const handleChange = e => {
      const { name, value } = e.target;
      setFormData(prevFormData => ({ ...prevFormData, [name]: value, discordName: auth.user?.displayName }));
    };
  }

    return (
      <div className="flex flex-col">
        <div className="w-full mx-2 flex-1">

          {/* ["string", "string", "string", ...] */}
          {/* {formCreateEventErrors} */}
          {formCreateEventErrors.forEach((error) => {
            <div class="alert alert-error shadow-lg text-red-700">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error} is needed to continue.</span>
              </div>
            </div>
          })}


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
            <input
              type="text"
              onChange={handleChange}
              value={formData["description"] || ""}
              name="description"
              placeholder="Description"
              className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
            />
          </div>
        </div>

        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
            Start Date
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="date"
              onChange={handleChange}
              value={formData["initialDate"] || ""}
              name="initialDate"
              placeholder="Start Date"
              className="p-1 px-2 appearance-none outline-non w-full text-gray-800"
            />
          </div>
        </div>

        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
            End Date
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="date"
              onChange={handleChange}
              value={formData["finalDate"] || ""}
              name="finalDate"
              placeholder="endDate"
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