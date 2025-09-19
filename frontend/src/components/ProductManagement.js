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
  const [imageFile, setImageFile] = useState(null);
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setFormData({ ...formData, imageUrl: '' }); // Clear URL if file is selected
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
        await API.updateProduct(editId, productData, imageFile);
        setEditId(null);
      } else {
        await API.addProduct(productData, imageFile);
      }

      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        imageUrl: '',
      });
      setImageFile(null);
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
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      price: product.price?.toString() || '',
      quantity: product.quantity?.toString() || '',
      imageUrl: product.imagePath && !product.imagePath.startsWith('/uploads/')
        ? product.imagePath
        : '',
    });
    setImageFile(null);
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

  const formatPrice = (price) => {
    const num = Number(price);
    return Number.isFinite(num) ? `$${num.toFixed(2)}` : 'N/A';
  };

  return (
    <div className="product-management-container" id="product-management-main">
      <h2 className="product-management-title" id="product-management-title">Product Management</h2>
      {error && <p className="product-management-error" id="product-management-error">{error}</p>}

      {/* Add/Update Product Form */}
      <div className="product-management-form-container" id="product-management-form">
        <div className="product-management-form-grid">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="product-management-input"
            id="input-product-name"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="product-management-input"
            id="input-product-description"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="product-management-input"
            id="input-product-category"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="product-management-input"
            id="input-product-price"
            step="0.01"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Initial Quantity"
            className="product-management-input"
            id="input-product-quantity"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="product-management-input product-management-file-input"
            id="input-product-image"
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL (alternative to file upload)"
            className="product-management-input"
            id="input-product-image-url"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="product-management-submit-btn"
          id="product-management-submit"
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
                    src={
                      product.imagePath.startsWith('http')
                        ? product.imagePath
                        : `http://localhost:3001${product.imagePath}`
                    }
                    alt={product.name}
                    className="product-management-product-image"
                    id={`product-image-${product.id}`}
                  />
                ) : (
                  <span className="product-management-no-image">No Image</span>
                )}
              </td>
              <td className="product-management-table-cell">{product.name}</td>
              <td className="product-management-table-cell">{product.description}</td>
              <td className="product-management-table-cell">{product.category}</td>
              <td className="product-management-table-cell">{formatPrice(product.price)}</td>
              <td className="product-management-table-cell">{product.quantity}</td>
              <td className="product-management-table-cell">
                <button
                  onClick={() => handleEdit(product)}
                  className="product-management-edit-btn"
                  id={`edit-btn-${product.id}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="product-management-delete-btn"
                  id={`delete-btn-${product.id}`}
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


