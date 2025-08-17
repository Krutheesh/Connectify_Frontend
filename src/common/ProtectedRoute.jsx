import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import PageLoader from "../components/PageLoader";

const ProtectedRoute = ({ children }) => {
  const { user, authChecked } = useSelector((state) => state.auth);

  // Wait until auth check finishes in App.js
  if (!authChecked) {
    return <PageLoader/> // don’t render anything, App.js already shows PageLoader
  }

  // If no user after auth check → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
