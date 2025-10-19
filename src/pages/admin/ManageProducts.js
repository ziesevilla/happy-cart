import React, { useState, useEffect } from "react";
import "../../styles/admins/ManageProducts.css";
import Sidebar from "../../assets/Sidebar";
import { FaBars, FaSearch } from "react-icons/fa";

// TEMPORARY MOCK DATA — replace later with backend API
const mockProducts = [
  {
    id: 1,
    name: "Iced Coffee",
    category: "Drinks",
    price: 89,
    stock: "In stock",
    image: "https://i.ibb.co/1Lb3bLn/iced-coffee.jpg",
  },
  {
    id: 2,
    name: "Chips",
    category: "Snacks",
    price: 57,
    stock: "Out of stock",
    image: "https://i.ibb.co/J3z8T3S/chips.jpg",
  },
  {
    id: 3,
    name: "Softdrinks",
    category: "Drinks",
    price: 78,
    stock: "In stock",
    image: "https://i.ibb.co/JxrmyfT/softdrinks.jpg",
  },
];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // This useEffect will later be replaced by your backend API fetch
  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-products-layout">
      {/* ===== Sidebar ===== */}
      <Sidebar />

      {/* ===== Main Content ===== */}
      <div className="manage-products-content">

        {/* ===== Module Header ===== */}
        <div className="module-header">
          <FaBars className="menu-icon" />
          <h2>Product Management</h2>
        </div>

        {/* ===== Search & Add Section ===== */}
        <div className="search-add-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="You can search Product Name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-btn">Add Product</button>
        </div>

        {/* ===== Product Table ===== */}
        <div className="product-table">
          {/* Table Header */}
          <div className="table-header">
            <span>Image</span>
            <span>Product Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
          </div>

          {/* Table Body */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-row">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-category">{product.category}</div>
                <div className="product-price">₱{product.price}</div>
                <div className="product-stock">
                  <span
                    className={
                      product.stock === "In stock"
                        ? "stock-in"
                        : "stock-out"
                    }
                  >
                    {product.stock}
                  </span>
                  <div className="actions">
                    <button className="edit-btn">EDIT</button>
                    <button className="delete-btn">DELETE</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No products found.</div>
          )}
        </div>

        {/* ===== Footer Placeholder (Optional) ===== */}
        <footer className="manage-footer"></footer>
      </div>
    </div>
  );
};

export default ManageProducts;
