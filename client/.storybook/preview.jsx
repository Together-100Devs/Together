import AuthProvider from "../src/contexts/AuthContext";
import EventsProvider from "../src/contexts/EventsContext";
import FormModalProvider from "../src/contexts/FormModalContext";
import FormProvider from "../src/contexts/FormContext";
import ModalProvider from "../src/contexts/ModalContext";
import RoutingProvider from "../src/contexts/RoutingContext";

import "../src/index.css";
import { MemoryRouter } from "react-router-dom";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <RoutingProvider>
          <AuthProvider>
            <ModalProvider>
              <EventsProvider>
                <FormModalProvider>
                  <FormProvider>
                    <Story />
                  </FormProvider>
                </FormModalProvider>
              </EventsProvider>
            </ModalProvider>
          </AuthProvider>
        </RoutingProvider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
