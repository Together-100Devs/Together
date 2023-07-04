import React from "react";
import "./index.css";
import App from "./App";
import AuthProvider from "contexts/AuthContext";
import RoutingProvider from "contexts/RoutingContext";
import ModalProvider from "contexts/ModalContext";
import EventsProvider from "contexts/EventsContext";
import FormModalProvider from "contexts/FormModalContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Router>
    <React.StrictMode>
      <RoutingProvider>
        <AuthProvider>
          <ModalProvider>
            <EventsProvider>
              <FormModalProvider>
                <App />
              </FormModalProvider>
            </EventsProvider>
          </ModalProvider>
        </AuthProvider>
      </RoutingProvider>
    </React.StrictMode>
  </Router>
);
