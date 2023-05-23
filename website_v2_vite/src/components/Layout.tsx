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
      <div className="w-full">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
