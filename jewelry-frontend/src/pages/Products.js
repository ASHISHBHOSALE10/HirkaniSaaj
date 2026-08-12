import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../services/api';
import { ShoppingBag, Star, ShieldCheck, Heart, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Products.css';

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState([]);
  const [addedToast, setAddedToast] = useState(null);

  const location = useLocation();

  const mockProducts = [
    {
      id: 1,
      name: 'The Nizam Royal Polki Choker',
      category: 'necklace',
      purity: '22K Gold • Uncut Polki Diamonds',
      price: 185000,
      originalPrice: 215000,
      description: 'Heirloom uncut Polki diamonds set in 22K hallmarked gold with Zambian emerald drops.',
      image: '/images/kundan_choker_necklace.png',
      tag: 'ROYAL BRIDAL',
      rating: 5.0,
      reviews: 42,
      inStock: true
    },
    {
      id: 2,
      name: 'Eternity Solitaire Diamond Ring',
      category: 'rings',
      purity: '18K Rose Gold • VVS1 Clarity',
      price: 95000,
      originalPrice: 110000,
      description: 'Certified 1.2 carat brilliant-cut solitaire diamond mounted on 18K rose gold pavé band.',
      image: '/images/diamond_solitaire_ring.png',
      tag: 'BESTSELLER',
      rating: 4.9,
      reviews: 68,
      inStock: true
    },
    {
      id: 3,
      name: 'Padmavati Temple Gold Kadas',
      category: 'bangles',
      purity: '22K Antique Yellow Gold',
      price: 145000,
      originalPrice: 165000,
      description: 'Pair of handcrafted 22K antique finish temple kadas with divine filigree motifs and rubies.',
      image: '/images/heritage_gold_bangles.png',
      tag: 'HERITAGE',
      rating: 4.9,
      reviews: 35,
      inStock: true
    },
    {
      id: 4,
      name: 'Zambian Emerald Chandelier Drops',
      category: 'earrings',
      purity: 'Platinum & 18K White Gold',
      price: 125000,
      originalPrice: 145000,
      description: 'Vivid green natural Zambian emeralds framed by round and baguette brilliant diamonds.',
      image: '/images/emerald_drop_earrings.png',
      tag: 'EXCLUSIVE',
      rating: 5.0,
      reviews: 29,
      inStock: true
    },
    {
      id: 5,
      name: 'Kashmiri Blue Sapphire Solitaire',
      category: 'rings',
      purity: '18K White Gold • Royal Blue',
      price: 165000,
      originalPrice: 190000,
      description: 'Velvety royal blue Ceylon sapphire enveloped by a micro-pavé halo of natural diamonds.',
      image: '/images/sapphire_royal_ring.png',
      tag: 'PRECIOUS GEM',
      rating: 4.8,
      reviews: 24,
      inStock: true
    },
    {
      id: 6,
      name: 'Mayur Antique Gold Jhumkas',
      category: 'earrings',
      purity: '22K Hallmarked Gold • Pearl Drops',
      price: 78000,
      originalPrice: 90000,
      description: 'Traditional handcrafted peacock jhumkas adorned with cabochon rubies and natural pearls.',
      image: '/images/antique_gold_jhumkas.png',
      tag: 'TRADITIONAL',
      rating: 4.9,
      reviews: 51,
      inStock: true
    },
    {
      id: 7,
      name: 'Burmese Ruby & Polki Heritage Haar',
      category: 'necklace',
      purity: '22K Gold • Pigeon Blood Rubies',
      price: 245000,
      originalPrice: 280000,
      description: 'Multi-strand royal necklace featuring rare pigeon-blood Burmese rubies and uncut Polki.',
      image: '/images/ruby_diamond_necklace.png',
      tag: 'MASTERPIECE',
      rating: 5.0,
      reviews: 19,
      inStock: true
    },
    {
      id: 8,
      name: 'South Sea Pearl & Emerald Necklace',
      category: 'necklace',
      purity: '18K Yellow Gold • Natural Pearls',
      price: 115000,
      originalPrice: 130000,
      description: 'Lustrous AAA South Sea white pearls accented with a carved Colombian emerald pendant.',
      image: '/images/pearl_diamond_necklace.png',
      tag: 'LUXURY PEARL',
      rating: 4.8,
      reviews: 31,
      inStock: true
    },
    {
      id: 9,
      name: 'Imperial Maharani Bridal Set',
      category: 'necklace',
      purity: '22K Gold • Complete Bridal Suite',
      price: 320000,
      originalPrice: 360000,
      description: 'Grand royal wedding choker with matching jhumkas, maang tikka, and regal cocktail ring.',
      image: '/images/hero_royal_necklace.png',
      tag: 'ROYAL SUITE',
      rating: 5.0,
      reviews: 15,
      inStock: true
    }
  ];

  useEffect(() => {
    // Parse URL query parameters if present
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    fetchProducts();
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      if (response.data && response.data.length > 0) {
        setProducts(response.data);
      } else {
        setProducts(mockProducts);
      }
    } catch (err) {
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

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

  // Filtering Logic
  const filteredProducts = products.filter(item => {
    // Category Filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      return false;
    }
    // Price Filter
    if (priceFilter === 'under50k' && item.price >= 50000) return false;
    if (priceFilter === '50k-100k' && (item.price < 50000 || item.price > 100000)) return false;
    if (priceFilter === '100k-200k' && (item.price < 100000 || item.price > 200000)) return false;
    if (priceFilter === 'above200k' && item.price <= 200000) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id;
  });

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
          <span className="section-subtitle">Haute Joaillerie Atelier</span>
          <h1 className="banner-title">The Royal Collection</h1>
          <p className="banner-desc">
            Explore 22K Hallmarked Gold, Certified Natural Solitaires & Imperial Heritage Polki masterworks.
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
                { id: 'necklace', label: 'Necklaces & Bridal' },
                { id: 'rings', label: 'Solitaire Rings' },
                { id: 'bangles', label: 'Heritage Bangles' },
                { id: 'earrings', label: 'Precious Earrings' }
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
              <p>HUID Hallmarked & Certified Natural Gemstones</p>
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
              <p>Unveiling Royal Masterpieces...</p>
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
