const API_URL = 'https://face2-jswz.onrender.com/api';

const API = {
  // Fetch all products
  async getProducts() {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Add a new product with optional image file or URL
  async addProduct(productData, imageFile = null) {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => formData.append(key, productData[key]));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to add product');
      return await response.json();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update an existing product with optional image file or URL
  async updateProduct(id, productData, imageFile = null) {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => formData.append(key, productData[key]));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Record a stock transaction (add or deduct)
  async recordStockTransaction(id, transaction) {
    try {
      const response = await fetch(`${API_URL}/stock/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) throw new Error('Failed to record stock transaction');
      return await response.json();
    } catch (error) {
      console.error('Error recording stock transaction:', error);
      throw error;
    }
  },

  // Fetch all sales
  async getSales() {
    try {
      const response = await fetch(`${API_URL}/sales`);
      if (!response.ok) throw new Error('Failed to fetch sales');
      return await response.json();
    } catch (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }
  },

  // Record a sale
  async recordSale(sale) {
    try {
      const response = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });
      if (!response.ok) throw new Error('Failed to record sale');
      return await response.json();
    } catch (error) {
      console.error('Error recording sale:', error);
      throw error;
    }
  },

  // Fetch all customers
  async getCustomers() {
    try {
      const response = await fetch(`${API_URL}/customers`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Add a new customer
  async addCustomer(customer) {
    try {
      const response = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error('Failed to add customer');
      return await response.json();
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  },

  // Update an existing customer
  async updateCustomer(id, customer) {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error('Failed to update customer');
      return await response.json();
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  // Delete a customer
  async deleteCustomer(id) {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete customer');
      return await response.json();
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  },
};

export default API;
