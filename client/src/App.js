import React, { useState, useEffect } from "react";
import Calendar from "features/calendar/Calendar";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";
import DataService from "services/dataService";
import { Context } from "./contexts/Context";
import LandingPage from "features/home/LandingPage";

function App() {
  const [context, setContext] = useState({
    page: "landingPage",
    user: null,
    event: null,
    modalOpen: false,
  });

  useEffect(() => {
    DataService.getCurrentUser().then(response => {
      context.user = response.data;
      setContext({ ...context });
    });
  }, []);

  return (
    <Context.Provider value={[context, setContext]}>
      {context.user && (
        <h3>Hello, {context.user.displayName}, welcome to Together!</h3>
      )}
      {context.page === "landingPage" && (
        <div className="flex justify-center bg-primary tablet:bg-blue-400 laptop:bg-purple-700 desktop:bg-lime-500">
          <div className="w-full tablet:w-2/3">
            <LandingPage />
          </div>
        </div>
      )}
      {context.page === "calendarPage" && (
        <>
          <button
            onClick={() => {
              context.page = "landingPage";
              setContext({ ...context });
            }}
          >
            Navigate to LandingPage
          </button>
          <Calendar />
          {context.user && (
            <div className="tablet:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
              <Modal />
              <UserForm />
            </div>
          )}
        </>
      )}
    </Context.Provider>
  );
}

export default App;

//items-center
