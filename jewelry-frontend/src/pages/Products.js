import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { ShoppingCart, Star } from 'lucide-react';
import './Products.css';

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data || mockProducts);
    } catch (err) {
      console.log('Using mock products for demo');
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const mockProducts = [
    { id: 1, name: 'सोने की अंगूठी', price: 15999, description: 'शुद्ध सोने की सुंदर अंगूठी', image: '💍', rating: 4.8 },
    { id: 2, name: 'हीरे की नेकलेस', price: 45999, description: 'चमकदार हीरे की नेकलेस', image: '✨', rating: 4.9 },
    { id: 3, name: 'सोने के कंगन', price: 12999, description: 'परंपरागत डिजाइन के कंगन', image: '💫', rating: 4.7 },
    { id: 4, name: 'पर्ल की माला', price: 9999, description: 'असली मोतियों की माला', image: '🔱', rating: 4.6 },
    { id: 5, name: 'मूंगे की कड़ी', price: 8999, description: 'लाल मूंगे की कड़ी', image: '🎭', rating: 4.5 },
    { id: 6, name: 'पन्ने की बालियां', price: 19999, description: 'प्राकृतिक पन्ने की बालियां', image: '💎', rating: 4.8 },
    { id: 7, name: 'नीलम की अंगूठी', price: 35999, description: 'शुद्ध नीलम की अंगूठी', image: '👑', rating: 4.9 },
    { id: 8, name: 'पीले सोने के झुमके', price: 11999, description: 'ट्रेंडी झुमके', image: '🌟', rating: 4.6 },
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.price <= parseInt(filter));

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>आभूषण संग्रह</h1>
        <p>विविध और सुंदर आभूषणों का विशाल संग्रह</p>
      </div>

      <div className="products-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>कीमत फ़िल्टर</h3>
          <div className="filter-group">
            <label>
              <input 
                type="radio" 
                name="price" 
                value="all" 
                checked={filter === 'all'}
                onChange={(e) => setFilter(e.target.value)}
              />
              सभी कीमत
            </label>
            <label>
              <input 
                type="radio" 
                name="price" 
                value="10000" 
                checked={filter === '10000'}
                onChange={(e) => setFilter(e.target.value)}
              />
              ₹10,000 तक
            </label>
            <label>
              <input 
                type="radio" 
                name="price" 
                value="25000" 
                checked={filter === '25000'}
                onChange={(e) => setFilter(e.target.value)}
              />
              ₹25,000 तक
            </label>
            <label>
              <input 
                type="radio" 
                name="price" 
                value="50000" 
                checked={filter === '50000'}
                onChange={(e) => setFilter(e.target.value)}
              />
              ₹50,000 तक
            </label>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-grid">
          {loading ? (
            <div className="loading">लोड हो रहा है...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">कोई आभूषण नहीं मिला</div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(product.rating) ? 'var(--primary-saffron)' : 'none'}
                        color={i < Math.floor(product.rating) ? 'var(--primary-saffron)' : 'var(--border-color)'}
                      />
                    ))}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                  <div className="product-footer">
                    <span className="price">₹{product.price.toLocaleString()}</span>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => onAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                      जोड़ें
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
