import React, { useState } from "react";
import Calendar from "features/calendar/Calendar";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";

function App() {

  const [page, setPage] = useState("landingPage");  

  if (page === "landingPage") {
    return (
      <>
        <h1>Hello, landingPage goes here</h1>
        <button onClick={() => setPage("calendarPage")}>
          Navigate to Calendar
        </button>
      </>
    ) 
  } else if (page === "calendarPage") {
    return (
      <div>
        <button onClick={() => setPage("landingPage")}>
          Navigate to LandingPage
        </button>
        <LoginWithDiscord />
        <Calendar />
        <Modal/>
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <UserForm />
        </div>
      </div>
    )
  }
}

export default App;
