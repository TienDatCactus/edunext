// src/pages/GooglePopupCallback.js (or .tsx)
import React, { useEffect } from "react";

export const GooglePopupCallback = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = window.location.search;

        const res = await fetch(
          `http://localhost:5000/auth/google/callback${query}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log(data);
        // Send data back to the parent window
        window.opener.postMessage(data, "http://localhost:3000");

        // Close popup
        window.close();
      } catch (error) {
        window.opener.postMessage(
          { isOk: false, error: "Có lỗi xảy ra khi đăng nhập Google!" },
          "http://localhost:3000"
        );
        window.close();
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Đang xử lý đăng nhập Google...</p>
    </div>
  );
};

export default GooglePopupCallback;
