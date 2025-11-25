import React from "react";
import { Button } from "react-bootstrap";
import "../../styles/components/ShopNow.css";

const ShopNow = ({
  href = "/products",
  text = "Shop Now",
  size = "md",
  className = "",
}) => {
  return (
    <Button
      variant="light"
      href={href}
      size={size}
      className={`shop-now-btn pink-btn fw-bold ${className}`}
    >
      {text}
    </Button>
  );
};

export default ShopNow;
