import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} DSA Visualize. All rights reserved.</p>
      <nav className="footer-nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </footer>
  );
};

export default Footer;