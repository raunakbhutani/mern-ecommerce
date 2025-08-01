import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://mern-ecommerce-1oz8.onrender.com/api/auth/admin-login';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(API_URL, form);
      if (!res.data.user.isAdmin) {
        setError('You are not an admin user.');
        return;
      }
      login(res.data.user, res.data.token);
      navigate('/admin-panel');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Server error');
      }
    }
  };

  return (
    <div className="admin-login-page" style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Admin Email" value={form.email} onChange={handleChange} required type="email" style={{ width: '100%', marginBottom: 8 }} />
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required type="password" style={{ width: '100%', marginBottom: 8 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" style={{ width: '100%' }}>Login as Admin</button>
      </form>
    </div>
  );
}
