/** @type { import('@storybook/react-vite').Preview } */
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import React from "react";

import EventsProvider from "../src/contexts/EventsContext";
import FormModalProvider from "../src/contexts/FormModalContext";
import FormProvider from "../src/contexts/FormContext";
import ModalProvider from "../src/contexts/ModalContext";

import "../src/index.css";

const preview = {
  decorators: [
    withRouter,
    (Story) =>
      React.createElement(ModalProvider, {
        children: React.createElement(EventsProvider, {
          children: React.createElement(FormModalProvider, {
            children: React.createElement(FormProvider, {
              children: React.createElement(Story),
            }),
          }),
        }),
      }),
  ],
  parameters: {
    parameters: {
      reactRouter: reactRouterParameters({}),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
