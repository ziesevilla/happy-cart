// src/pages/admin/ManageProducts.js
import React, { useState, useEffect } from "react";
import "../../styles/admins/ManageProducts.css";
import Sidebar from "../../components/layout/Sidebar.js";
import { FaBars, FaSearch, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { mockDB } from "../../assets/data/mockDatabase";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  // Initialize products from mockDatabase
  useEffect(() => {
    setProducts(mockDB.products);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProductClick = () => {
    setEditingProduct(null);
    setShowAddPopup(true);
    setNewProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setShowAddPopup(true);
    setNewProduct({
      name: product.name,
      description: product.description || "",
      category: getCategoryName(product.categories?.[0] || 1),
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
    });
  };

  const handleClosePopup = () => {
    setShowAddPopup(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: newProduct.name,
              description: newProduct.description,
              price: parseFloat(newProduct.price),
              stock: parseInt(newProduct.stock),
              image: newProduct.image,
              categories: [getCategoryId(newProduct.category)]
            }
          : product
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id)) + 1;
      const newItem = {
        id: newId,
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        image: newProduct.image || "https://via.placeholder.com/150",
        categories: [getCategoryId(newProduct.category)],
        category: newProduct.category // For display purposes
      };
      setProducts([...products, newItem]);
    }
    
    setShowAddPopup(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    }
  };

  // Helper functions for category conversion
  const getCategoryName = (categoryId) => {
    const category = mockDB.categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Men's Clothing";
  };

  const getCategoryId = (categoryName) => {
    const category = mockDB.categories.find(cat => cat.name === categoryName);
    return category ? category.id : 1;
  };

  // Get all categories for dropdown
  const categories = mockDB.categories;

  // Format currency
  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString()}`;
  };

  // Get stock status
  const getStockStatus = (stock) => {
    return stock > 0 ? "In stock" : "Out of stock";
  };

  return (
    <div className="manage-products-layout">
      <Sidebar />

      <div className="manage-products-content">
        <div className="module-header">
          <FaBars className="menu-icon" />
          <h2>Product Management</h2>
          <div className="product-stats">
            <span>Total: {products.length}</span>
            <span>In Stock: {products.filter(p => p.stock > 0).length}</span>
            <span>Out of Stock: {products.filter(p => p.stock === 0).length}</span>
          </div>
        </div>

        <div className="search-add-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-btn" onClick={handleAddProductClick}>
            Add Product
          </button>
        </div>

        <div className="product-table">
          <div className="table-header">
            <span>Image</span>
            <span>Product Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock Status</span>
            <span>Actions</span>
          </div>

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-row">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-description">
                    {product.description || "No description available"}
                  </div>
                </div>
                <div className="product-category">
                  {getCategoryName(product.categories?.[0] || 1)}
                </div>
                <div className="product-price">{formatCurrency(product.price)}</div>
                <div className="product-stock">
                  <span className={product.stock > 0 ? "stock-in" : "stock-out"}>
                    {getStockStatus(product.stock)}
                  </span>
                  <div className="stock-quantity">({product.stock} units)</div>
                </div>
                <div className="actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEditProductClick(product)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No products found.</p>
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {showAddPopup && (
          <div className="add-product-popup">
            <div className="add-product-container">
              <div className="add-product-header">
                <FaArrowLeft className="back-icon" onClick={handleClosePopup} />
                <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
              </div>

              <div className="add-product-body">
                <div className="photo-upload-section">
                  <label htmlFor="imageUpload" className="photo-box">
                    {newProduct.image ? (
                      <img
                        src={newProduct.image}
                        alt="preview"
                        className="preview-image"
                      />
                    ) : (
                      <span className="plus-sign">+</span>
                    )}
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <p>Add Photo</p>
                </div>

                <form className="add-product-form" onSubmit={handleAddProductSubmit}>
                  <label>Product Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter product name"
                  />

                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows="3"
                  />

                  <label>Category:</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <div className="price-stock-row">
                    <div className="form-group">
                      <label>Price (₱):</label>
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock Quantity:</label>
                      <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-add-btn">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;