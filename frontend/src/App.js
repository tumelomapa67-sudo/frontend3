import React, { useState } from 'react';
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
      {/* Top Navigation */}
      <nav className="top-nav" id="top-nav">
        <h2 className="nav-title">Wings Cafe Inventory</h2>
        <ul className="top-nav-list" id="top-nav-list">
          <li>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={currentView === 'dashboard' ? 'active' : ''}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('products')}
              className={currentView === 'products' ? 'active' : ''}
            >
              Product Management
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('stock')}
              className={currentView === 'stock' ? 'active' : ''}
            >
              Stock Management
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('sales')}
              className={currentView === 'sales' ? 'active' : ''}
            >
              Sales
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('customers')}
              className={currentView === 'customers' ? 'active' : ''}
            >
              Customers
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('reporting')}
              className={currentView === 'reporting' ? 'active' : ''}
            >
              Reporting
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content + Footer */}
      <div className="app-main-content">
        <div className="app-content" id="app-content">
          {renderView()}
        </div>

        <footer className="app-footer" id="app-footer">
          <p>&copy; {new Date().getFullYear()} Wings Cafe Inventory System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

