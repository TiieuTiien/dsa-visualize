import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="logo">DSA Visualize</div>
      <nav className="nav-menu">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/docs">Docs</a>
      </nav>
    </header>
  );
};

export default Header;