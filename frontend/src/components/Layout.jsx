import React from "react";
import NavbarApp from "./NavbarApp";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <NavbarApp />
        <main className="content-wrapper">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;