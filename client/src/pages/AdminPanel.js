import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user, token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', countInStock: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/admin');
      return;
    }
    axios.get('https://mern-ecommerce-1oz8.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/products', {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts([...products, res.data]);
      setForm({ name: '', description: '', price: '', image: '', countInStock: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Error occurred');
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p._id !== id));
    } catch {
      setError('Could not delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <h2>Admin Panel</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ marginRight: 8 }} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={{ marginRight: 8 }} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required type="number" style={{ marginRight: 8, width: 90 }} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={{ marginRight: 8, width: 160 }} />
        <input name="countInStock" placeholder="Stock" value={form.countInStock} onChange={handleChange} required type="number" style={{ marginRight: 8, width: 70 }} />
        <button type="submit">Add Product</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>{p.countInStock}</td>
              <td>{p.image ? <img src={p.image} alt={p.name} style={{ width: 40, height: 30, objectFit: 'cover' }} /> : '-'}</td>
              <td><button onClick={() => handleDelete(p._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
