import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/Login/Login.tsx";
import SsoLogin from "./pages/Login/SsoLogin.tsx";
import ThemeUpdater from "./ThemeWrapper/ThemeWrapper.tsx";

function App() {
  return (
    <ThemeUpdater>
      <BrowserRouter basename="authapp">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/ssoLogin/:id" element={<SsoLogin />} />
        </Routes>
        <CssBaseline />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "18px",
              fontWeight: "medium",
              fontFamily: "Inter",
              color: "#0D0B0E",
            },
          }}
        />
      </BrowserRouter>
    </ThemeUpdater>
  );
}
export default App;
