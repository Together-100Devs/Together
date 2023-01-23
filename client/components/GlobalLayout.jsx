import React from "react";

import { useAuthContext } from "client/contexts/AuthContext";
import Modal from "client/features/modal/Modal";
import RejectionModal from "client/features/modal/RejectionModal";

const GlobalLayout = ({ children }) => {
  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated();
  const isNot100Dever = auth.isNot100Dever();
  //Sets rejection modal to true because updating state is a pain
  //Line 52 will prevent the modal from rendering unless user is not 100Dever
  const [rejectionModalOpen, setRejectionModalOpen] = React.useState(true)
  const rejectionModalContext = { isOpen: rejectionModalOpen, handleClose:  () => { setRejectionModalOpen(false) } }

  return (
    <>
      {isAuthenticated && (
        <h3>Hello, {auth.user.displayName}, welcome to Together!</h3>
      )}
      {isNot100Dever &&
        <Modal context={rejectionModalContext}>
          <RejectionModal handleClose={rejectionModalContext.handleClose}/>
        </Modal>
      }
      {children}
    </>
  )
};

export default GlobalLayout;