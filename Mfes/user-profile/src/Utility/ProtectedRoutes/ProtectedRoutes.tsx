import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../GetToken/GetToken.tsx";

function PrivateRoutes() {
  const token = getAuthToken();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="http://4.188.95.143:8000/auth" replace />
  );
}
export default PrivateRoutes;
