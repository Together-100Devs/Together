import React, {useState} from "react";
import Modal from "features/modal/Modal";
import RejectionModal from "features/modal/RejectionModal";
import { useRoutingContext } from "contexts/RoutingContext";
import { useAuthContext } from "contexts/AuthContext";
import LandingPage from "features/home/LandingPage";
import CalendarPage from "features/home/CalendarPage";

function App() {
  const routing = useRoutingContext();
  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated();
  const isNot100Dever = auth.isNot100Dever();
  //Sets rejection modal to true because updating state is a pain
  //Line 52 will prevent the modal from rendering unless user is not 100Dever
  const [rejectionModalOpen, setRejectionModalOpen] = useState(true)
  const rejectionModalContext = { isOpen: rejectionModalOpen, handleClose:  () => { setRejectionModalOpen(false) }}

  return (
    <>
      {isAuthenticated && (
        <h3>Hello, {auth.user.displayName}, welcome to Together!</h3>
      )}
      {routing.currentPage === "landingPage" && (
        <div className="bg-primary flex justify-center">
          <div className="w-full tablet:w-11/12 desktop:w-2/3">
            <LandingPage />
            {isNot100Dever &&
              <Modal context={rejectionModalContext}>
                <RejectionModal handleClose={rejectionModalContext.handleClose}/>
              </Modal>
            }
          </div>
        </div>
      )}
      {routing.currentPage === "calendarPage" && (
      <CalendarPage>
        {isNot100Dever && (
          <Modal context={rejectionModalContext}>
            <RejectionModal handleClose={rejectionModalContext.handleClose}/>
          </Modal>
        )}
      </CalendarPage>
      )}
    </>
  );
}

export default App;
