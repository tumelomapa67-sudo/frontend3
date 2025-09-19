import React, { useState, useEffect } from 'react';
import API from './API';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productData, salesData, customerData] = await Promise.all([
        API.getProducts(),
        API.getSales(),
        API.getCustomers(),
      ]);
      setProducts(productData || []);
      setSales(salesData || []);
      setCustomers(customerData || []);
    } catch (err) {
      setError(
        err.message.includes('Failed to fetch')
          ? 'Failed to connect to the server. Please ensure the backend is running and CORS is configured.'
          : `Error: ${err.message}`
      );
    }
  };

  // ✅ Changed currency from $ to M
  const formatPrice = (price) =>
    Number.isFinite(price) ? `M${price.toFixed(2)}` : 'N/A';

  const totalProducts = products.length;
  const lowStockProducts = products.filter((product) => product.quantity < 10).length;
  const totalSales = sales.length;
  const totalCustomers = customers.length;
  const recentSales = sales.slice(0, 5);

  return (
    <div className="dashboard-container" id="dashboard-main">
      <h2 className="dashboard-title" id="dashboard-title">Dashboard</h2>
      {error && <p className="dashboard-error" id="dashboard-error">{error}</p>}

      {/* Metrics Cards */}
      <div className="dashboard-metrics-grid" id="dashboard-metrics">
        <div className="dashboard-metric-card" id="metric-total-products">
          <h3 className="dashboard-metric-title">Total Products</h3>
          <p className="dashboard-metric-value">{totalProducts}</p>
        </div>
        <div className="dashboard-metric-card" id="metric-low-stock">
          <h3 className="dashboard-metric-title">Low Stock Products</h3>
          <p className="dashboard-metric-value dashboard-low-stock">{lowStockProducts}</p>
        </div>
        <div className="dashboard-metric-card" id="metric-total-sales">
          <h3 className="dashboard-metric-title">Total Sales</h3>
          <p className="dashboard-metric-value">{totalSales}</p>
        </div>
        <div className="dashboard-metric-card" id="metric-total-customers">
          <h3 className="dashboard-metric-title">Total Customers</h3>
          <p className="dashboard-metric-value">{totalCustomers}</p>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="dashboard-section" id="dashboard-recent-sales">
        <h3 className="dashboard-section-title" id="recent-sales-title">Recent Sales</h3>
        <table className="dashboard-table" id="recent-sales-table">
          <thead className="dashboard-table-head">
            <tr>
              <th className="dashboard-table-header">Product Name</th>
              <th className="dashboard-table-header">Quantity Sold</th>
              <th className="dashboard-table-header">Date</th>
            </tr>
          </thead>
          <tbody className="dashboard-table-body">
            {recentSales.map((sale) => (
              <tr key={sale.id} className="dashboard-table-row">
                <td className="dashboard-table-cell">
                  {products.find((p) => p.id === sale.productId)?.name || 'Unknown'}
                </td>
                <td className="dashboard-table-cell">{sale.quantity}</td>
                <td className="dashboard-table-cell">{new Date(sale.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low Stock Products */}
      <div className="dashboard-section" id="dashboard-low-stock">
        <h3 className="dashboard-section-title" id="low-stock-title">Low Stock Alerts</h3>
        <table className="dashboard-table" id="low-stock-table">
          <thead className="dashboard-table-head">
            <tr>
              <th className="dashboard-table-header">Image</th>
              <th className="dashboard-table-header">Product Name</th>
              <th className="dashboard-table-header">Category</th>
              <th className="dashboard-table-header">Stock Level</th>
            </tr>
          </thead>
          <tbody className="dashboard-table-body">
            {products
              .filter((product) => product.quantity < 10)
              .map((product) => (
                <tr key={product.id} className="dashboard-table-row">
                  <td className="dashboard-table-cell dashboard-image-cell">
                    {product.imagePath ? (
                      <img
                        src={
                          product.imagePath.startsWith('http')
                            ? product.imagePath
                            : `http://localhost:3001${product.imagePath}`
                        }
                        alt={product.name}
                        className="dashboard-product-image"
                        id={`product-image-${product.id}`}
                      />
                    ) : (
                      <span className="dashboard-no-image">No Image</span>
                    )}
                  </td>
                  <td className="dashboard-table-cell">{product.name}</td>
                  <td className="dashboard-table-cell">{product.category}</td>
                  <td className="dashboard-table-cell dashboard-low-stock">
                    {product.quantity}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* All Products */}
      <div className="dashboard-section" id="dashboard-all-products">
        <h3 className="dashboard-section-title" id="all-products-title">All Products</h3>
        <table className="dashboard-table" id="all-products-table">
          <thead className="dashboard-table-head">
            <tr>
              <th className="dashboard-table-header">Image</th>
              <th className="dashboard-table-header">Name</th>
              <th className="dashboard-table-header">Category</th>
              <th className="dashboard-table-header">Price</th>
              <th className="dashboard-table-header">Stock Level</th>
            </tr>
          </thead>
          <tbody className="dashboard-table-body">
            {products.map((product) => (
              <tr key={product.id} className="dashboard-table-row">
                <td className="dashboard-table-cell dashboard-image-cell">
                  {product.imagePath ? (
                    <img
                      src={
                        product.imagePath.startsWith('http')
                          ? product.imagePath
                          : `http://localhost:3001${product.imagePath}`
                      }
                      alt={product.name}
                      className="dashboard-product-image"
                      id={`product-image-${product.id}`}
                    />
                  ) : (
                    <span className="dashboard-no-image">No Image</span>
                  )}
                </td>
                <td className="dashboard-table-cell">{product.name}</td>
                <td className="dashboard-table-cell">{product.category}</td>
                <td className="dashboard-table-cell">{formatPrice(product.price)}</td>
                <td className="dashboard-table-cell">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;


