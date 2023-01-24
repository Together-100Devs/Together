import React from 'react';

import AuthProvider from 'client/contexts/AuthContext';
import ModalProvider from 'client/contexts/ModalContext';
import EventsProvider from "client/contexts/EventsContext";
import FormModalProvider from "client/contexts/FormModalContext";

const GlobalLayout = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <EventsProvider>
          <FormModalProvider>
            {children}
          </FormModalProvider>
        </EventsProvider>
      </ModalProvider>
    </AuthProvider>
  )
};

export default GlobalLayout;