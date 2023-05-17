import { Routes, Route, Link, Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
