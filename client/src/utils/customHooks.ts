import { useState, useEffect } from "react";

const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1; // getMonth() returns 0-11

  // Spring: March (3) - May (5)
  if (month >= 1 && month <= 5) {
    return "spring";
  }
  // Summer: June (6) - August (8)
  else if (month >= 6 && month <= 8) {
    return "summer";
  }
  // Fall: September (9) - November (11)
  else if (month >= 9 && month <= 11) {
    return "fall";
  }
};
const useErrorBoundary = () => {
  const [error, setError] = useState<ErrorEvent>();

  useEffect(() => {
    const errorHandler = (event: ErrorEvent | PromiseRejectionEvent) => {
      setError(
        event instanceof ErrorEvent
          ? event.error
          : new Error("An unknown error occurred")
      );
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", errorHandler);
    };
  }, []);

  return { error, setError };
};

export { getCurrentSeason, useErrorBoundary };
