import { ConfigProvider } from "antd";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LoadingScreen from "./ui/_elements/Loading/LoadingScreen";
import router from "./utils/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// observe((knightPosition: any) =>
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Funnel Display", sans-serif',
        },
        components: {
          Button: {
            // defaultActiveColor: "#bae5f5",
            // defaultActiveBorderColor: "#bae5f5",
            // defaultHoverColor: "#bae5f5",
            // defaultHoverBorderColor: "#bae5f5",
            // groupBorderColor: "#bae5f5",
          },
        },
      }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
        {/* <Board knightPosition={knightPosition} /> */}
      </Suspense>
    </ConfigProvider>
  </React.StrictMode>
);
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
