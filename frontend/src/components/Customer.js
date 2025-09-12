import React, { useState, useEffect } from 'react';
import API from './API';
import './Customer.css'; // Import the new CSS file

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await API.getCustomers();
      setCustomers(data);
    } catch (err) {
      setError('Failed to load customers');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        // Update existing customer
        await API.updateCustomer(editId, formData);
        setEditId(null);
      } else {
        // Add new customer
        await API.addCustomer(formData);
      }
      setFormData({ name: '', contact: '' });
      fetchCustomers();
    } catch (err) {
      setError('Failed to save customer');
    }
  };

  const handleEdit = (customer) => {
    setEditId(customer.id);
    setFormData({
      name: customer.name,
      contact: customer.contact,
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.deleteCustomer(id);
      fetchCustomers();
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  return (
    <div className="customer-container" id="customer-main">
      <h2 className="customer-title" id="customer-title">Customer Management</h2>
      {error && <p className="customer-error" id="customer-error">{error}</p>}

      {/* Add/Update Customer Form */}
      <div className="customer-form-container" id="customer-form">
        <div className="customer-form-grid">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Customer Name"
            className="customer-input"
            id="customer-name-input"
            required
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Contact (Email/Phone)"
            className="customer-input"
            id="customer-contact-input"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="customer-submit-btn"
          id="customer-submit"
        >
          {editId ? 'Update Customer' : 'Add Customer'}
        </button>
      </div>

      {/* Customers Table */}
      <table className="customer-table" id="customer-table">
        <thead className="customer-table-head">
          <tr>
            <th className="customer-table-header">Name</th>
            <th className="customer-table-header">Contact</th>
            <th className="customer-table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="customer-table-body">
          {customers.map((customer) => (
            <tr key={customer.id} className="customer-table-row">
              <td className="customer-table-cell">{customer.name}</td>
              <td className="customer-table-cell">{customer.contact}</td>
              <td className="customer-table-cell">
                <button
                  onClick={() => handleEdit(customer)}
                  className="customer-edit-btn"
                  id={`customer-edit-btn-${customer.id}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="customer-delete-btn"
                  id={`customer-delete-btn-${customer.id}`}
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

export default Customer;