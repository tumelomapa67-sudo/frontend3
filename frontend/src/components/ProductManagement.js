import React, { useState, useEffect } from 'react';
import API from './API';
import './ProductManagement.css';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    imageUrl: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await API.getProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err.message.includes('Failed to fetch')
          ? 'Failed to connect to the server. Please ensure the backend is running and CORS is configured.'
          : `Error: ${err.message}`
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        imageUrl: formData.imageUrl,
      };

      if (editId) {
        await API.updateProduct(editId, productData);
        setEditId(null);
      } else {
        await API.addProduct(productData);
      }

      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        imageUrl: '',
      });

      fetchProducts();
      setError(null);
    } catch (err) {
      setError(
        err.message.includes('Failed to fetch')
          ? 'Failed to connect to the server. Please ensure the backend is running and CORS is configured.'
          : `Error: ${err.message}`
      );
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      imageUrl: product.imagePath?.startsWith('/uploads/') ? '' : product.imagePath || '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.deleteProduct(id);
      fetchProducts();
      setError(null);
    } catch (err) {
      setError(
        err.message.includes('Failed to fetch')
          ? 'Failed to connect to the server. Please ensure the backend is running and CORS is configured.'
          : `Error: ${err.message}`
      );
    }
  };

  return (
    <div className="product-management-container" id="product-management-main">
      <h2 className="product-management-title" id="product-management-title">Product Management</h2>
      {error && <p className="product-management-error" id="product-management-error">{error}</p>}

      {/* Product Form */}
      <div className="product-management-form-container" id="product-management-form">
        <div className="product-management-form-grid">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="product-management-input"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="product-management-input"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="product-management-input"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            step="0.01"
            className="product-management-input"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="product-management-input"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="product-management-input"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="product-management-submit-btn"
        >
          {editId ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      {/* Products Table */}
      <table className="product-management-table" id="product-management-table">
        <thead className="product-management-table-head">
          <tr>
            <th className="product-management-table-header">Image</th>
            <th className="product-management-table-header">Name</th>
            <th className="product-management-table-header">Description</th>
            <th className="product-management-table-header">Category</th>
            <th className="product-management-table-header">Price</th>
            <th className="product-management-table-header">Quantity</th>
            <th className="product-management-table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="product-management-table-body">
          {products.map((product) => (
            <tr key={product.id} className="product-management-table-row">
              <td className="product-management-table-cell product-management-image-cell">
                {product.imagePath ? (
                  <img
                    src={product.imagePath.startsWith('http') ? product.imagePath : `http://localhost:3001${product.imagePath}`}
                    alt={product.name}
                    className="product-management-product-image"
                  />
                ) : (
                  <span className="product-management-no-image">No Image</span>
                )}
              </td>
              <td className="product-management-table-cell">{product.name}</td>
              <td className="product-management-table-cell">{product.description}</td>
              <td className="product-management-table-cell">{product.category}</td>
              <td className="product-management-table-cell">
                M{(product.price ?? 0).toFixed(2)}
              </td>
              <td className="product-management-table-cell">{product.quantity}</td>
              <td className="product-management-table-cell">
                <button
                  onClick={() => handleEdit(product)}
                  className="product-management-edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="product-management-delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;



