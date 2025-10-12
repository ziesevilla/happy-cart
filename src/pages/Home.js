// src/pages/Home.js
import React from "react";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="mb-4">🏝️ Welcome to Our Store!</h1>
      <p className="lead">
        Explore our latest products and enjoy seamless shopping.
      </p>
      <Button variant="primary" href="/products">
        Browse Products
      </Button>
    </Container>
  );
};

export default Home;
