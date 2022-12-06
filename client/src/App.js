import React, { useState, useEffect } from "react";
import Calendar from "features/calendar/Calendar";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import UserForm from "features/form/UserForm";
import DataService from "services/dataService";
import { Context } from "./contexts/Context"

function App() {
  const [context, setContext] = useState({user: null})

  useEffect(() => {
    DataService.getCurrentUser().then(response => {
      setContext({ user: response.data })
    });
  }, []);

  return (
    <Context.Provider value={[context, setContext]}>
      <LoginWithDiscord />
      {!context.user && <>
        <h1>Hello, landingPage goes here</h1>
      </>}
      {context.user && <>
        <Calendar />
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <UserForm />
        </div>
      </>}
    </Context.Provider>
  )
}

export default App;
