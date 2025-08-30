import React from "react";

const CalendarSubscriptionModal = ({ onClose }) => {
  const domain = window.location.host;

  const handleCopy = async () => {
    try {
      const icsUrl = `${window.location.origin}/calendar.ics`;
      await navigator.clipboard.writeText(icsUrl);
      alert("URL copied to clipboard!");
    } catch (err) {
      console.log("Failed to copy text: ", err);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg w-96 z-50">
      <h3 className="text-xl font-bold mb-4 text-center">
        Add iCal Subscription
      </h3>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Add this event feed to your calendar app to stay up to date.
      </p>

      <div className="space-y-3">
        <a
          href={`https://calendar.google.com/calendar/r/settings/addbyurl?url=${window.location.origin}/calendar.ics`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Google Calendar
        </a>

        <a
          href={`https://outlook.office.com/calendar/0/addfromweb?url=webcal://${domain}/calendar.ics`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Outlook Calendar
        </a>

        <a
          href={`webcal://${domain}/calendar.ics`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          System Calendar
        </a>

        <div
          onClick={handleCopy}
          className="text-center text-purple-600 cursor-pointer hover:underline mt-4"
        >
          Copy URL to Clipboard
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarSubscriptionModal;
