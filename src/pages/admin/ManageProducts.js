import React, { useState, useEffect } from "react";
import "../../styles/admins/ManageProducts.css";
import Sidebar from "../../assets/Sidebar";
import { FaBars, FaSearch, FaArrowLeft } from "react-icons/fa";

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
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProductClick = () => {
    setShowAddPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddPopup(false);
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
    const newId = products.length + 1;
    const newItem = { ...newProduct, id: newId };
    setProducts([...products, newItem]);
    setShowAddPopup(false);
  };

  return (
    <div className="manage-products-layout">
      <Sidebar />

      <div className="manage-products-content">
        <div className="module-header">
          <FaBars className="menu-icon" />
          <h2>Product Management</h2>
        </div>

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
            <span>Stock</span>
          </div>

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
                      product.stock === "In stock" ? "stock-in" : "stock-out"
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

        {showAddPopup && (
          <div className="add-product-popup">
            <div className="add-product-container">
              <div className="add-product-header">
                <FaArrowLeft className="back-icon" onClick={handleClosePopup} />
                <h3>Add Product</h3>
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
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                    required
                  />

                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                  />

                  <label>Category:</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Meals">Meals</option>
                  </select>

                  <div className="price-stock-row">
                    <div>
                      <label>Price:</label>
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Stock:</label>
                      <input
                        type="text"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-add-btn">
                    Add Product
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
