import React, { PropsWithChildren, ReactElement } from "react";
import { BrowserRouter, Navigate, Router } from "react-router-dom";
import { useErrorBoundary } from "./customHooks";

const ErrorBoundary: React.FC<{ children?: any }> = ({ children }) => {
  const { error } = useErrorBoundary();
  if (error) {
    return (
      <BrowserRouter>
        <Navigate to="/error" state={{ error: error?.message }} />
      </BrowserRouter>
    );
  }

  return children;
};

export default ErrorBoundary;
