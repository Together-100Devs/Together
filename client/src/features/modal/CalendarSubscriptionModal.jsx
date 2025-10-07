import React, { useEffect, useState } from "react";

const CalendarSubscriptionModal = ({ onClose }) => {
  const [icsUrl, setIcsUrl] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    // Determine the correct URL for the ICS calendar
    const getCalendarUrl = () => {
      const currentOrigin = window.location.origin;

      // Check if we're behind ngrok
      // ngrok URLs look like: https://abc123.ngrok-free.app
      // They contain "ngrok" in the hostname
      if (currentOrigin.includes("ngrok")) {
        console.log("[Modal] Detected ngrok URL:", currentOrigin);
        return `${currentOrigin}/calendar.ics`;
      }

      // Check if we're in development (localhost)
      if (
        currentOrigin.includes("localhost") ||
        currentOrigin.includes("127.0.0.1")
      ) {
        console.log("[Modal] Detected localhost URL:", currentOrigin);
        // In development, the frontend is on port 3000 but backend is on 2121
        // We need to adjust the URL to hit the backend directly
        const backendUrl = currentOrigin.replace(":3000", ":2121");
        return `${backendUrl}/calendar.ics`;
      }

      // Production environment
      console.log("[Modal] Using production URL:", currentOrigin);
      return `${currentOrigin}/calendar.ics`;
    };

    setIcsUrl(getCalendarUrl());
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(icsUrl);
      setCopyMessage("URL copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (err) {
      setCopyMessage("Failed to copy. Try again.");
      console.error("Copy failed:", err);
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!icsUrl) {
    return null; // Don't render until URL is determined
  }

  // Encode the URL for use in calendar app links
  const encodedUrl = encodeURIComponent(icsUrl);
  const domain = new URL(icsUrl).hostname;

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg w-96 z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <h3 id="modal-title" className="text-xl font-bold mb-4 text-center">
        Add iCal Subscription
      </h3>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Add this event feed to your calendar app to stay up to date.
      </p>

      {/* Debug info - only show in development */}
      {(icsUrl.includes("localhost") || icsUrl.includes("ngrok")) && (
        <div className="bg-blue-50 p-2 rounded mb-4 text-xs text-blue-700">
          <p>
            <strong>Debug:</strong> {icsUrl}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <a
          href={`https://calendar.google.com/calendar/r/settings/addbyurl?url=${encodedUrl}`}
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
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCopy();
            }
          }}
        >
          Copy URL to Clipboard
        </div>
      </div>

      {copyMessage && (
        <div
          className={`text-sm mt-3 text-center ${
            copyMessage.includes("Failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {copyMessage}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarSubscriptionModal;
