import React from "react";
import LeftSidebar from "./LeftSidebar";

const MainLayout = ({ children, openSearchModal }) => {
  return (
    <div className="flex min-h-screen">
      <div className="rs-container" style={{ width: '250px' }}>
        <LeftSidebar openSearchModal={openSearchModal} />
      </div>
      <main className="flex-1 flex flex-col p-4">{children}</main>
    </div>
  );
};

export default MainLayout;
