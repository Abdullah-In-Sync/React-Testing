/* istanbul ignore file */
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import * as React from "react";

import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { SnackbarProvider } from "notistack";
import { AuthProvider } from "../contexts/AuthContext";
import { SidebarProvider } from "../contexts/SidebarContext";
import "../styles/main.css";
import createEmotionCache from "../utility/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          autoHideDuration={6000}
        >
          <SidebarProvider>
            <CacheProvider value={emotionCache}>
              <CssBaseline />
              <Component {...pageProps} />
            </CacheProvider>
          </SidebarProvider>
        </SnackbarProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MyApp;
