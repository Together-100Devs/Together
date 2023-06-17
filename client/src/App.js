import React, { useEffect, useState } from "react";
import Modal from "features/modal/Modal";
import RejectionModal from "features/modal/RejectionModal";
import WelcomeUserModal from "features/modal/WelcomeUserModal";
import { useAuthContext } from "contexts/AuthContext";
import LandingPage from "pages/LandingPage";
import CalendarPage from "pages/CalendarPage";
import { AdminDashboard } from "pages/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated();
  const isNot100Dever = auth.isNot100Dever();
  const deleteNeedsToBeWelcome = auth.deleteNeedsToBeWelcome;
  //Sets rejection modal to true because updating state is a pain
  //Line 49 will prevent the modal from rendering unless user is not 100Dever
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

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
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
