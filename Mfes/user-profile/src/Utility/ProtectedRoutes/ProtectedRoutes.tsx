import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../GetToken/GetToken.tsx";

function PrivateRoutes() {
  const token = getAuthToken();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="http://localhost:8080/auth" replace />
  );
}
export default PrivateRoutes;
