import React, { useState, useEffect } from "react";
import Calendar from "features/calendar/Calendar";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import UserForm from "features/form/UserForm";
import DataService from "services/dataService";
import { Context } from "./contexts/Context"

function App() {
  const [context, setContext] = useState({user: null, page: "landingPage"})

  const setPage = (page) => {
    context.page = page
    setContext({...context})
  }

  useEffect(() => {
    DataService.getCurrentUser().then(response => {
      context.user = response.data;
      setContext({...context})
      console.log(context.user)
    });
  }, []);

  return (
    <Context.Provider value={[context, setContext]}>
      {context.page === "landingPage" && <>
        <h1>Hello, landingPage goes here</h1>
        <button onClick={() => setPage("calendarPage")}>
          Navigate to Calendar
        </button>
        <LoginWithDiscord />
      </>}
      {context.page === "calendarPage" && <>
        <button onClick={() => setPage("landingPage")}>
          Navigate to LandingPage
        </button>
        <Calendar />
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <UserForm />
        </div>
      </>}
    </Context.Provider>
  )
}

export default App;
