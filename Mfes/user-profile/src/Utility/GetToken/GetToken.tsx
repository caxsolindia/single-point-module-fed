export function getAuthToken(): null | string {
  return localStorage.getItem("authToken");
}
