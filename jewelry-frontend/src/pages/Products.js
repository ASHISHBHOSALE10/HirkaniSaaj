import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../services/api';
import { ShoppingBag, Star, ShieldCheck, Heart, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Products.css';
import { productCatalog, getFilteredProducts } from '../data/catalog';

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState([]);
  const [addedToast, setAddedToast] = useState(null);

  const location = useLocation();
  const fallbackProducts = useMemo(() => productCatalog, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      if (response.data && response.data.length > 0) {
        setProducts(response.data);
      } else {
        setProducts(fallbackProducts);
      }
    } catch (err) {
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }, [fallbackProducts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    fetchProducts();
  }, [location.search, fetchProducts]);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const filteredProducts = useMemo(
    () => getFilteredProducts(products, { categoryFilter, priceFilter, sortBy }),
    [products, categoryFilter, priceFilter, sortBy]
  );

  return (
    <div className="royal-products-page">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            className="royal-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Sparkles size={16} className="gold-text-icon" />
            <span><strong>{addedToast}</strong> has been added to your Royal Bag</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="products-hero-banner">
        <div className="royal-container">
          <span className="section-subtitle">HirkaniSaaj Haute Atelier</span>
          <h1 className="banner-title">The Royal Collection (शाही संग्रह)</h1>
          <p className="banner-desc">
            Explore 22K Hallmarked Gold, Certified Natural Solitaires & Imperial Heritage Kolhapuri Saaj masterworks.
          </p>
        </div>
      </div>

      <div className="royal-container products-main-layout">
        {/* Filter Sidebar */}
        <aside className="royal-sidebar">
          <div className="sidebar-header">
            <Filter size={18} color="#D4AF37" />
            <h3>Filter Jewels</h3>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4 className="filter-group-title">Collections</h4>
            <div className="filter-options">
              {[
                { id: 'all', label: 'All Masterpieces' },
                { id: 'necklace', label: 'Kolhapuri Saaj & Thushi' },
                { id: 'rings', label: 'Solitaire Diamond Rings' },
                { id: 'bangles', label: 'Temple Kadas & Tode' },
                { id: 'earrings', label: 'Precious Earrings & Jhumkas' }
              ].map(cat => (
                <label key={cat.id} className="royal-radio-label">
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat.id} 
                    checked={categoryFilter === cat.id}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  />
                  <span className="custom-radio"></span>
                  <span className="option-text">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4 className="filter-group-title">Price Range</h4>
            <div className="filter-options">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under50k', label: 'Under ₹50,000' },
                { id: '50k-100k', label: '₹50,000 – ₹1,00,000' },
                { id: '100k-200k', label: '₹1,00,000 – ₹2,00,000' },
                { id: 'above200k', label: 'Above ₹2,00,000' }
              ].map(price => (
                <label key={price.id} className="royal-radio-label">
                  <input 
                    type="radio" 
                    name="price" 
                    value={price.id} 
                    checked={priceFilter === price.id}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  />
                  <span className="custom-radio"></span>
                  <span className="option-text">{price.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Trust Seal in Sidebar */}
          <div className="sidebar-trust-seal">
            <ShieldCheck size={28} color="#D4AF37" />
            <div className="seal-text">
              <strong>100% Certified Purity</strong>
              <p>BIS 916 HUID Hallmarked & IGI Certified Gemstones</p>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="royal-catalog-content">
          {/* Controls Bar */}
          <div className="catalog-controls-bar">
            <div className="results-count">
              Showing <strong>{filteredProducts.length}</strong> Royal Masterpieces
            </div>

            <div className="sort-controls">
              <label htmlFor="sortSelect">Sort By:</label>
              <select 
                id="sortSelect"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="royal-select"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="catalog-loading">
              <Sparkles size={36} className="gold-text-icon floating-anim" />
              <p>Unveiling HirkaniSaaj Masterpieces...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products-box">
              <h3>No Masterpieces Found</h3>
              <p>Try adjusting your filter options to view other creations.</p>
              <button 
                className="btn btn-royal-gold" 
                onClick={() => { setCategoryFilter('all'); setPriceFilter('all'); }}
                style={{ marginTop: '16px' }}
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <motion.div className="products-grid-layout" layout>
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    className="royal-product-card"
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ translateY: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Area */}
                    <div className="product-image-box">
                      <span className="badge-tag">{product.tag}</span>
                      <button 
                        className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product.id)}
                        title="Add to Wishlist"
                        aria-label="Wishlist"
                      >
                        <Heart size={18} fill={wishlist.includes(product.id) ? '#EF4444' : 'none'} color={wishlist.includes(product.id) ? '#EF4444' : '#666'} />
                      </button>
                      <img src={product.image} alt={product.name} className="product-card-img" />
                    </div>

                    {/* Content Area */}
                    <div className="product-card-body">
                      <div className="product-purity-tag">{product.purity}</div>
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-desc-snippet">{product.description}</p>

                      <div className="product-rating-box">
                        <div className="star-icons">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} fill="#D4AF37" color="#D4AF37" />
                          ))}
                        </div>
                        <span className="rating-num">({product.rating})</span>
                      </div>

                      <div className="card-footer-action">
                        <div className="pricing">
                          <span className="price-val">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice && (
                            <span className="price-strike">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>

                        <motion.button 
                          className="btn btn-royal-gold btn-small"
                          onClick={() => handleAdd(product)}
                          whileTap={{ scale: 0.96 }}
                        >
                          <ShoppingBag size={14} />
                          ADD TO BAG
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
