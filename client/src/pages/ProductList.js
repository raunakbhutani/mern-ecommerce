import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #eee', borderRadius: 8, width: 220, padding: 16, cursor: 'pointer' }} onClick={() => navigate(`/product/${p._id}`)}>
            <img src={p.image || 'https://via.placeholder.com/200'} alt={p.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4 }} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button style={{ width: '100%' }} onClick={e => {e.stopPropagation(); navigate(`/product/${p._id}`);}}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
