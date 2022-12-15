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
        <div className="overflow-hidden flex justify-center items-center h-screen">
          <div className="w-1/3">
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

          <main className="flex">
            <section className="flex-[.2]">
              <button>Log out</button>
              <button>Help</button>
            </section>
            <section className="flex-[.7]">
              <button>Add to Calendar</button>
              <img src="#" alt="Lady SVG" />
              <Calendar />
            </section>
          </main>

          {context.user && (
            <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
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
