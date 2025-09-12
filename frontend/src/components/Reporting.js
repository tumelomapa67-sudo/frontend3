import React, { useState, useEffect } from 'react';
import API from './API';
import './Reporting.css'; // Import the new CSS file

function Reporting() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
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

  // Calculate sales summary (total quantity sold per product)
  const salesSummary = products.map((product) => {
    const totalSold = sales
      .filter((sale) => sale.productId === product.id)
      .reduce((sum, sale) => sum + sale.quantity, 0);
    return { ...product, totalSold };
  });

  return (
    <div className="reporting-container" id="reporting-main">
      <h2 className="reporting-title" id="reporting-title">Reporting</h2>
      {error && <p className="reporting-error" id="reporting-error">{error}</p>}

      {/* Low Stock Report */}
      <div className="reporting-section" id="reporting-low-stock">
        <h3 className="reporting-section-title" id="low-stock-title">Low Stock Report</h3>
        <table className="reporting-table" id="low-stock-table">
          <thead className="reporting-table-head">
            <tr>
              {/* Uncomment to add image column */}
              {/* <th className="reporting-table-header">Image</th> */}
              <th className="reporting-table-header">Product Name</th>
              <th className="reporting-table-header">Category</th>
              <th className="reporting-table-header">Stock Level</th>
            </tr>
          </thead>
          <tbody className="reporting-table-body">
            {products
              .filter((product) => product.quantity < 10)
              .map((product) => (
                <tr key={product.id} className="reporting-table-row">
                  {/* Uncomment to add image column */}
                  {/* <td className="reporting-table-cell reporting-image-cell">
                    {product.imagePath ? (
                      <img
                        src={product.imagePath.startsWith('http') ? product.imagePath : `http://localhost:3001${product.imagePath}`}
                        alt={product.name}
                        className="reporting-product-image"
                        id={`low-stock-image-${product.id}`}
                      />
                    ) : (
                      <span className="reporting-no-image">No Image</span>
                    )}
                  </td> */}
                  <td className="reporting-table-cell">{product.name}</td>
                  <td className="reporting-table-cell">{product.category}</td>
                  <td className="reporting-table-cell reporting-low-stock">{product.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Sales Summary Report */}
      <div className="reporting-section" id="reporting-sales-summary">
        <h3 className="reporting-section-title" id="sales-summary-title">Sales Summary</h3>
        <table className="reporting-table" id="sales-summary-table">
          <thead className="reporting-table-head">
            <tr>
              {/* Uncomment to add image column */}
              {/* <th className="reporting-table-header">Image</th> */}
              <th className="reporting-table-header">Product Name</th>
              <th className="reporting-table-header">Category</th>
              <th className="reporting-table-header">Total Sold</th>
            </tr>
          </thead>
          <tbody className="reporting-table-body">
            {salesSummary.map((product) => (
              <tr key={product.id} className="reporting-table-row">
                {/* Uncomment to add image column */}
                {/* <td className="reporting-table-cell reporting-image-cell">
                  {product.imagePath ? (
                    <img
                      src={product.imagePath.startsWith('http') ? product.imagePath : `http://localhost:3001${product.imagePath}`}
                      alt={product.name}
                      className="reporting-product-image"
                      id={`sales-summary-image-${product.id}`}
                    />
                  ) : (
                    <span className="reporting-no-image">No Image</span>
                  )}
                </td> */}
                <td className="reporting-table-cell">{product.name}</td>
                <td className="reporting-table-cell">{product.category}</td>
                <td className="reporting-table-cell">{product.totalSold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reporting;