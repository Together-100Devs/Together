import React, { useEffect, useState } from "react";
import Modal from "features/modal/Modal";
import RejectionModal from "features/modal/RejectionModal";
import WelcomeUserModal from "features/modal/WelcomeUserModal";
import { useAuthContext } from "contexts/AuthContext";
import LandingPage from "pages/LandingPage";
import CalendarPage from "pages/CalendarPage";
import { AdminDashboard } from "pages/AdminDashboard";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated();
  const isNot100Dever = auth.isNot100Dever();
  const deleteNeedsToBeWelcome = auth.deleteNeedsToBeWelcome;

  /*  from feature-#441 implementation of testing needed before isAdmin and isLoading can be used
  const isAdmin = auth.isAdmin; 
  const isLoading = auth.loading; // Destructure loading from auth 
  */

  //Sets rejection modal to true because updating state is a pain
  //Line 65 will prevent the modal from rendering unless user is not 100Dever
  const [rejectionModalOpen, setRejectionModalOpen] = useState(true);
  const rejectionModalContext = {
    isOpen: rejectionModalOpen,
    handleClose: () => {
      setRejectionModalOpen(false);
    },
  };
  const [welcomeUserModalOpen, setWelcomeUserModalOpen] = useState(false);
  const welcomeUserModalContext = {
    isOpen: welcomeUserModalOpen,
    handleClose: () => {
      setWelcomeUserModalOpen(false);
      deleteNeedsToBeWelcome();
    },
  };
  useEffect(() => {
    if (auth.user) setWelcomeUserModalOpen(auth.needsToBeWelcome());
  }, [auth]);

  /* from featute-#441 implementation of testing for user that has admin role needed before use.
    if (isLoading) {
      return <div>Loading...</div>; // Render a loading indicator while fetching user data
    }
  */

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        {/* From feature-#441 Not included now because testing needs to be implemented that logs in a user with admin role */}
        {/* {isAdmin() && ( */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        {/* )} */}
      </Routes>
      {isAuthenticated && (
        <Modal context={welcomeUserModalContext}>
          <WelcomeUserModal handleClose={welcomeUserModalContext.handleClose} />
        </Modal>
      )}
      {isNot100Dever && (
        <Modal context={rejectionModalContext}>
          <RejectionModal handleClose={rejectionModalContext.handleClose} />
        </Modal>
      )}
    </>
  );
}
export default App;
