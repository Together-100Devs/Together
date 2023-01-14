import React, {useState} from "react";
import Calendar from "features/calendar/Calendar";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";
import EventModal from "features/modal/EventModal";
import RejectionModal from "features/modal/RejectionModal";
import { useRoutingContext } from "contexts/RoutingContext";
import { useAuthContext } from "contexts/AuthContext";
import { useModalContext } from "contexts/ModalContext";
import LandingPage from "features/home/LandingPage";
import FormProvider from "contexts/FormContext";

function App() {
  const routing = useRoutingContext();
  const auth = useAuthContext();
  const modal = useModalContext();
  const isAuthenticated = auth.isAuthenticated();
  const isNot100Dever = auth.isNot100Dever();
  //Sets rejection modal to true because updating state is a pain
  //Line 52 will prevent the modal from rendering unless user is not 100Dever
  const [rejectionModalOpen, setRejectionModalOpen] = useState(true)
  const rejectionModalContext = { isOpen: rejectionModalOpen, handleClose:  () => { setRejectionModalOpen(false) }}

  return (
    <>
      {isAuthenticated && 
        <h3>Hello, {auth.user.displayName}, welcome to Together!</h3>
      }
      {routing.currentPage === "landingPage" &&
      <div className="bg-primary overflow-hidden flex justify-center items-center h-screen">
        <div className="flex w-1/3">
          <LandingPage />
        </div>
      </div>
      }
      {routing.currentPage === "calendarPage" && <>
        <button onClick={() => routing.setCurrentPage('landingPage')}>
          Navigate to LandingPage
        </button>
        <Calendar />
        <FormProvider>
          <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
            <Modal context={modal}>
              <EventModal />
            </Modal>
            {auth?.user && 
              <UserForm />
            }
          </div>
        </FormProvider>
      </>}
      {isNot100Dever &&
      <Modal context={rejectionModalContext}>
        <RejectionModal handleClose={rejectionModalContext.handleClose}/>
      </Modal>
      }
    </>
  )
}

export default App;
