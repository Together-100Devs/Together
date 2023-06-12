import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "contexts/AuthContext";
import RoutingProvider from "contexts/RoutingContext";
import ModalProvider from "contexts/ModalContext";
import EventsProvider from "contexts/EventsContext";
import FormModalProvider from "contexts/FormModalContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// const rootElement = document.getElementById("root");
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RoutingProvider>
      <AuthProvider>
        <ModalProvider>
          <EventsProvider>
            <FormModalProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </FormModalProvider>
          </EventsProvider>
        </ModalProvider>
      </AuthProvider>
    </RoutingProvider>
  </React.StrictMode>
);
