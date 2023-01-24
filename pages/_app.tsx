import { AppProps } from "next/app";
import React from "react";

import "client/index.css";
import GlobalContextProviders from "client/components/GlobalContextProviders";
import GlobalLayout from "client/components/GlobalLayout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProviders>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </GlobalContextProviders>
  );
};

export default App;