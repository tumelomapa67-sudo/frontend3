import React, { useState, useEffect } from 'react';
import API from './API';
import './Sales.css'; // Import the new CSS file

function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [transaction, setTransaction] = useState({ productId: '', quantity: '' });
  const [error, setError] = useState(null);

  // Fetch products and sales on component mount
  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await API.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    }
  };

  const fetchSales = async () => {
    try {
      const data = await API.getSales();
      setSales(data);
    } catch (err) {
      setError('Failed to load sales');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await API.recordSale({
        productId: transaction.productId,
        quantity: parseInt(transaction.quantity),
      });
      setTransaction({ productId: '', quantity: '' });
      fetchSales();
      fetchProducts(); // Refresh products to update stock levels
    } catch (err) {
      setError('Failed to record sale');
    }
  };

  return (
    <div className="sales-container" id="sales-main">
      <h2 className="sales-title" id="sales-title">Sales</h2>
      {error && <p className="sales-error" id="sales-error">{error}</p>}

      {/* Sales Transaction Form */}
      <div className="sales-form-container" id="sales-form">
        <div className="sales-form-grid">
          <select
            name="productId"
            value={transaction.productId}
            onChange={handleInputChange}
            className="sales-select"
            id="sales-product-select"
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Stock: {product.quantity})
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            value={transaction.quantity}
            onChange={handleInputChange}
            placeholder="Quantity Sold"
            className="sales-input"
            id="sales-quantity-input"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="sales-submit-btn"
          id="sales-submit"
        >
          Record Sale
        </button>
      </div>

      {/* Sales History Table */}
      <table className="sales-table" id="sales-table">
        <thead className="sales-table-head">
          <tr>
            {/* Uncomment to add image column */}
            {/* <th className="sales-table-header">Image</th> */}
            <th className="sales-table-header">Product Name</th>
            <th className="sales-table-header">Quantity Sold</th>
            <th className="sales-table-header">Date</th>
          </tr>
        </thead>
        <tbody className="sales-table-body">
          {sales.map((sale) => (
            <tr key={sale.id} className="sales-table-row">
              {/* Uncomment to add image column */}
              {/* <td className="sales-table-cell sales-image-cell">
                {products.find((p) => p.id === sale.productId)?.imagePath ? (
                  <img
                    src={products.find((p) => p.id === sale.productId).imagePath.startsWith('http') ? products.find((p) => p.id === sale.productId).imagePath : `http://localhost:3001${products.find((p) => p.id === sale.productId).imagePath}`}
                    alt={products.find((p) => p.id === sale.productId)?.name || 'Unknown'}
                    className="sales-product-image"
                    id={`sales-product-image-${sale.id}`}
                  />
                ) : (
                  <span className="sales-no-image">No Image</span>
                )}
              </td> */}
              <td className="sales-table-cell">
                {products.find((p) => p.id === sale.productId)?.name || 'Unknown'}
              </td>
              <td className="sales-table-cell">{sale.quantity}</td>
              <td className="sales-table-cell">
                {new Date(sale.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;