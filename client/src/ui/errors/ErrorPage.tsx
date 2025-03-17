import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const ErrorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error || "An unexpected error occurred.";
  return (
    <div>
      <h1>{error}</h1>
    </div>
  );
};

export default ErrorPage;
