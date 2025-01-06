import React from "react";
import Header from "../_elements/Layout/Header";
import Footer from "../_elements/Layout/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
