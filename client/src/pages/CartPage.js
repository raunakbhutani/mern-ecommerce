import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { user, token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    axios.get('https://mern-ecommerce-1oz8.onrender.com/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCart(res.data))
      .catch(() => setError('Could not load cart'))
      .finally(() => setLoading(false));
  }, [user, token, navigate]);

  const handleRemove = async (productId) => {
    try {
      await axios.post('https://mern-ecommerce-1oz8.onrender.com/api/cart/remove', { productId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(cart.filter(item => item.product._id !== productId));
    } catch {
      setError('Could not remove item');
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div style={{ maxWidth: 700, margin: '30px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <div>No items in cart.</div> : (
        <>
          <table style={{ width: '100%', marginBottom: 16 }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.product._id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.product.price * item.quantity}</td>
                  <td><button onClick={() => handleRemove(item.product._id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', fontWeight: 'bold' }}>Total: ${total}</div>
        </>
      )}
    </div>
  );
}
