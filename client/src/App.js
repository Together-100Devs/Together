import React, { useState, useEffect } from "react";
import Calendar from "features/calendar/Calendar";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";
import DataService from "services/dataService";
import { Context } from "./contexts/Context"
import LandingPage from "features/home/LandingPage";

function App() {
  const [context, setContext] = useState({page: "landingPage", user: null, event: null, eventModal: false})
  
  useEffect(() => {
    DataService.getCurrentUser().then(response => {
      setContext(prevContext => ({
        ...prevContext,
        user: response.data,
      }));
    });
  }, []);

  return (
    <Context.Provider value={[context, setContext]}>
      {context.user && 
        <h3>Hello, {context.user.displayName}, welcome to Together!</h3>
      }
      {context.page === "landingPage" &&
      <div className="bg-primary overflow-hidden flex justify-center items-center h-screen">
        <div className="flex w-1/3">
          <LandingPage />
        </div>
      </div>
      }
      {context.page === "calendarPage" && <>
        <button onClick={() => {
          context.page = "landingPage"
          setContext({...context})
        }}>
          Navigate to LandingPage
        </button>
        <Calendar />
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <Modal type={'event'} open={'eventModal'}/>
          {context.user && 
            <UserForm />
          }
        </div>
      </>}
    </Context.Provider>
  )
}

export default App;
