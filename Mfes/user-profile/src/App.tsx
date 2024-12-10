import { Suspense } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "services/apolloClient";
import ErrorBoundary from "./ErrorBoundry.tsx";
import ThemeUpdater from "./ThemeWrapper/ThemeWrapper.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import Experience from "./Pages/Experience/Experience.tsx";
import ProtectedRoutes from "./Utility/ProtectedRoutes/ProtectedRoutes.tsx";

function App() {
  return (
    <CssBaseline>
      <ThemeUpdater>
        <ApolloProvider client={client}>
          <BrowserRouter basename="profile">
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Suspense fallback="loading">
                      <Profile />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
              <Route
                element={
                  <ErrorBoundary>
                    <Suspense fallback="loading">
                      <ProtectedRoutes />
                    </Suspense>
                  </ErrorBoundary>
                }
              >
                <Route
                  path="/experience"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback="loading">
                        <Experience />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeUpdater>
    </CssBaseline>
  );
}

export default App;
