import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  // if user is not logged in
  if (!isLoggedIn) {
    // redirect to main page
    return <Navigate to="/" replace />;
  }
  // if user is logged in
  return children;
}

export default ProtectedRoute;
