import React from "react";
import Header from "../_elements/Layout/Header";
import Footer from "../_elements/Layout/Footer";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
