import React from "react";
import Calendar from "features/calendar/Calendar";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";
import { useRoutingContext } from "contexts/RoutingContext";
import { useAuthContext } from "contexts/AuthContext";
import LandingPage from "features/home/LandingPage";
import FormProvider from "contexts/FormContext";

function App() {
  const routing = useRoutingContext();
  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated();

  return (
    <>
      {isAuthenticated && (
        <h3>Hello, {auth.user.displayName}, welcome to Together!</h3>
      )}
      {routing.currentPage === "landingPage" && (
        <div className="bg-primary flex justify-center">
          <div className="w-full tablet:w-11/12 desktop:w-2/3">
            <LandingPage />
          </div>
        </div>
      )}
      {routing.currentPage === "calendarPage" && (
        <>
          <button onClick={() => routing.setCurrentPage("landingPage")}>
            Navigate to LandingPage
          </button>
          <Calendar />
          <FormProvider>
            <div className="tablet:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
              <Modal type={"event"} open={"eventModal"} />
              {auth?.user && <UserForm />}
            </div>
          </FormProvider>
        </>
      )}
    </>
  );
}

export default App;
