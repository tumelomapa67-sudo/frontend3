import React, { useState, useEffect } from 'react';
import API from './API';
import './StockManagement.css'; // Import the new CSS file

function StockManagement() {
  const [products, setProducts] = useState([]);
  const [transaction, setTransaction] = useState({ productId: '', quantity: '', type: 'add' });
  const [error, setError] = useState(null);

  // Fetch products on component mount
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
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await API.recordStockTransaction(transaction.productId, {
        quantity: parseInt(transaction.quantity),
        type: transaction.type,
      });
      setTransaction({ productId: '', quantity: '', type: 'add' });
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
    <div className="stock-management-container" id="stock-management-main">
      <h2 className="stock-management-title" id="stock-management-title">Stock Management</h2>
      {error && <p className="stock-management-error" id="stock-management-error">{error}</p>}

      {/* Stock Transaction Form */}
      <div className="stock-management-form-container" id="stock-management-form">
        <div className="stock-management-form-grid">
          <select
            name="productId"
            value={transaction.productId}
            onChange={handleInputChange}
            className="stock-management-select"
            id="stock-product-select"
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            value={transaction.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="stock-management-input"
            id="stock-quantity-input"
            required
          />
          <select
            name="type"
            value={transaction.type}
            onChange={handleInputChange}
            className="stock-management-select"
            id="stock-type-select"
          >
            <option value="add">Add Stock</option>
            <option value="deduct">Deduct Stock</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="stock-management-submit-btn"
          id="stock-management-submit"
        >
          Record Transaction
        </button>
      </div>

      {/* Stock Levels Table */}
      <table className="stock-management-table" id="stock-management-table">
        <thead className="stock-management-table-head">
          <tr>
            {/* Uncomment to add image column */}
            {/* <th className="stock-management-table-header">Image</th> */}
            <th className="stock-management-table-header">Product Name</th>
            <th className="stock-management-table-header">Category</th>
            <th className="stock-management-table-header">Stock Level</th>
            <th className="stock-management-table-header">Status</th>
          </tr>
        </thead>
        <tbody className="stock-management-table-body">
          {products.map((product) => (
            <tr key={product.id} className="stock-management-table-row">
              {/* Uncomment to add image column */}
              {/* <td className="stock-management-table-cell stock-management-image-cell">
                {product.imagePath ? (
                  <img
                    src={product.imagePath.startsWith('http') ? product.imagePath : `http://localhost:3001${product.imagePath}`}
                    alt={product.name}
                    className="stock-management-product-image"
                    id={`stock-product-image-${product.id}`}
                  />
                ) : (
                  <span className="stock-management-no-image">No Image</span>
                )}
              </td> */}
              <td className="stock-management-table-cell">{product.name}</td>
              <td className="stock-management-table-cell">{product.category}</td>
              <td className="stock-management-table-cell">{product.quantity}</td>
              <td className="stock-management-table-cell">
                {product.quantity < 10 ? (
                  <span className="stock-management-low-stock">Low Stock!</span>
                ) : (
                  <span className="stock-management-sufficient">Sufficient</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockManagement;