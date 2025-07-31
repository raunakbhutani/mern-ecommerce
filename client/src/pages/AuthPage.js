import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, {
          email: form.email,
          password: form.password,
        });
        login(res.data.user, res.data.token);
        if (res.data.user.isAdmin) navigate('/admin');
        else navigate('/');
      } else {
        await axios.post(`${API_URL}/register`, form);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Error occurred');
    }
  };

  return (
    <div className="auth-page" style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        )}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" style={{ width: '100%', marginBottom: 8 }} />
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required type="password" style={{ width: '100%', marginBottom: 8 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', marginBottom: 8 }}>{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(l => !l)} style={{ width: '100%' }}>
        {isLogin ? 'Need to register?' : 'Already have an account?'}
      </button>
    </div>
  );
}
