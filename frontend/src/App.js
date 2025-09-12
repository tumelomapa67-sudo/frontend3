import React, { useState } from 'react';
import { FaTachometerAlt, FaBox, FaWarehouse, FaShoppingCart, FaUsers, FaChartBar } from 'react-icons/fa';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import StockManagement from './components/StockManagement';
import Sales from './components/Sales';
import Customer from './components/Customer';
import Reporting from './components/Reporting';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManagement />;
      case 'stock':
        return <StockManagement />;
      case 'sales':
        return <Sales />;
      case 'customers':
        return <Customer />;
      case 'reporting':
        return <Reporting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container" id="app-main">
      {/* Sidebar */}
      <nav className="app-nav" id="app-nav">
        {/* Sidebar Title */}
        <div className="app-nav-header">
          <h2>Wings Cafe Inventory</h2>
        </div>

        <ul className="app-nav-list" id="app-nav-list">
          <li className="app-nav-item">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`app-nav-btn ${currentView === 'dashboard' ? 'app-nav-btn-active' : ''}`}
              id="nav-dashboard"
            >
              <FaTachometerAlt className="app-nav-icon" />
              Dashboard
            </button>
          </li>
          <li className="app-nav-item">
            <button
              onClick={() => setCurrentView('products')}
              className={`app-nav-btn ${currentView === 'products' ? 'app-nav-btn-active' : ''}`}
              id="nav-products"
            >
              <FaBox className="app-nav-icon" />
              Product Management
            </button>
          </li>
          <li className="app-nav-item">
            <button
              onClick={() => setCurrentView('stock')}
              className={`app-nav-btn ${currentView === 'stock' ? 'app-nav-btn-active' : ''}`}
              id="nav-stock"
            >
              <FaWarehouse className="app-nav-icon" />
              Stock Management
            </button>
          </li>
          <li className="app-nav-item">
            <button
              onClick={() => setCurrentView('sales')}
              className={`app-nav-btn ${currentView === 'sales' ? 'app-nav-btn-active' : ''}`}
              id="nav-sales"
            >
              <FaShoppingCart className="app-nav-icon" />
              Sales
            </button>
          </li>
          <li className="app-nav-item">
            <button
              onClick={() => setCurrentView('customers')}
              className={`app-nav-btn ${currentView === 'customers' ? 'app-nav-btn-active' : ''}`}
              id="nav-customers"
            >
              <FaUsers className="app-nav-icon" />
              Customers
            </button>
          </li>
          <li className="app-nav-item">
            <button
              onClick={() => setCurrentView('reporting')}
              className={`app-nav-btn ${currentView === 'reporting' ? 'app-nav-btn-active' : ''}`}
              id="nav-reporting"
            >
              <FaChartBar className="app-nav-icon" />
              Reporting
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="app-content" id="app-content">{renderView()}</div>
    </div>
  );
}

export default App;
