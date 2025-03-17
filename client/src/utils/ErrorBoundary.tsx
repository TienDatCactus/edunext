import React, { PropsWithChildren, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useErrorBoundary } from "./customHooks";

const ErrorBoundary: React.FC<{ children?: any }> = ({ children }) => {
  const { error } = useErrorBoundary();
  if (error) {
    return <Navigate to="/error" state={{ error: error?.message }} />;
  }

  return children;
};

export default ErrorBoundary;
