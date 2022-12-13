import React, { useState, useEffect } from "react";
import Calendar from "features/calendar/Calendar";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";
import DataService from "services/dataService";
import { Context } from "./contexts/Context"
import LandingPage from "features/home/LandingPage";

function App() {
  const [context, setContext] = useState({user: null, event: null, modalOpen: false})
  const [page, setPage] = useState("landingPage")
  
  useEffect(() => {
    DataService.getCurrentUser().then(response => {
      setContext({ user: response.data })
    });
  }, []);

  return (
    <Context.Provider value={[context, setContext]}>
      {context.user && 
        <h3>Hello, {context.user.displayName}, welcome to Together!</h3>
      }
      {page === "landingPage" &&
      <div className="bg-primary overflow-hidden flex justify-center items-center h-screen">
        <div className="w-1/3">
          <LandingPage />
        </div>
      </div>
      }
      {page === "calendarPage" && <>
        <button onClick={() => setPage("landingPage")}>
          Navigate to LandingPage
        </button>
        <Calendar />
        {context.user && 
          <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
            <Modal/>
            <UserForm />
          </div>
        }
      </>}
    </Context.Provider>
  )
}


export default App;
