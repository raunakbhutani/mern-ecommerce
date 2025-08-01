import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://mern-ecommerce-1oz8.onrender.com/api/products')
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setProduct(found || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate('/login');
    try {
      await axios.post('https://mern-ecommerce-1oz8.onrender.com/api/cart/add', {
        productId: id,
        quantity: Number(quantity)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/cart');
    } catch (err) {
      setError('Could not add to cart');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ maxWidth: 700, margin: '30px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} style={{ width: 300, height: 200, objectFit: 'cover', borderRadius: 4 }} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Stock:</b> {product.countInStock}</p>
      <input type="number" min={1} max={product.countInStock} value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: 60, marginRight: 8 }} />
      <button onClick={handleAddToCart} disabled={product.countInStock < 1}>Add to Cart</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}
