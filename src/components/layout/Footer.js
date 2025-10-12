import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-auto">
      <Container>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} ShopWave 🌊 — All Rights Reserved
        </p>
        <small>Built with React & Bootstrap</small>
      </Container>
    </footer>
  );
}

export default Footer;
