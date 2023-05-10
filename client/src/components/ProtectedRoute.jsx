import { Routes, Route, Link, Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  console.log(user, "USER");
  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
