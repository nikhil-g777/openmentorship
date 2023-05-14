import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
