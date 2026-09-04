import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Sparkles, RefreshCw, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';
import { homeCategories, trendingMasterpieces } from '../data/catalog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Home() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: '100% BIS 916 Hallmarked',
      description: 'Every gold creation carries 6-digit HUID purity certification guarantee.',
    },
    {
      icon: Award,
      title: 'IGI Certified Solitaires',
      description: 'Handpicked VVS-EF natural diamonds authenticated by world-renowned laboratories.',
    },
    {
      icon: Sparkles,
      title: 'Royal Karigari',
      description: 'Handcrafted by hereditary master artisans preserving 300-year-old royal Maratha techniques.',
    },
    {
      icon: RefreshCw,
      title: 'Lifetime Buyback Assurance',
      description: 'Complete transparency with lifetime exchange and guaranteed transparent valuation.',
    },
  ];

  return (
    <div className="royal-home-page">
      {/* 1. HERO SECTION */}
      <section className="royal-hero-section">
        <div className="royal-container hero-grid">
          <motion.div 
            className="hero-narrative"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-badge">
              <Sparkles size={14} className="gold-text-icon" />
              <span>HIRKANISAAJ • ROYAL MARATHA HERITAGE 2026</span>
            </div>

            <h1 className="hero-main-title">
              शाही वारसा. <br />
              <span className="gold-foil-text">अमर तेज.</span>
            </h1>

            <p className="hero-tagline-hindi">
              हिरकणी साज — जिथे परंपरा आणि राजेशाही भव्यता यांचा अपूर्व संगम होतो.
            </p>

            <p className="hero-description">
              Handcrafted in pure 22K Hallmarked Gold, Certified VVS Solitaires, and Rare Gemstones. Inspired by historic royal dynasties and treasured heirloom celebrations.
            </p>

            <div className="hero-cta-actions">
              <Link to="/products" className="btn btn-royal-gold btn-large">
                <ShoppingBag size={18} />
                EXPLORE MASTERPIECES
              </Link>
              <Link to="/products?category=necklace" className="btn btn-outline-white btn-large">
                KOLHAPURI SAAJ & CHOKERS
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="stat-box">
                <span className="stat-number">28+</span>
                <span className="stat-label">Years of Heritage</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">BIS 916 Hallmarked</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Royal Patrons</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="hero-image-frame">
              <div className="ornate-arch-glow"></div>
              <img 
                src="/images/hero_royal_necklace.png" 
                alt="HirkaniSaaj Royal Bridal Masterpiece" 
                className="hero-masterpiece-img"
              />
              <div className="floating-hallmark-card">
                <div className="hallmark-icon">✦</div>
                <div className="hallmark-text">
                  <strong>BIS 916 HALLMARKED</strong>
                  <span>100% Certified Natural Diamonds & Gold</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST PILLARS */}
      <section className="royal-trust-section">
        <div className="royal-container">
          <div className="trust-grid">
            {trustPillars.map((pillar, idx) => (
              <motion.div 
                key={idx} 
                className="trust-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="trust-icon-box">
                  <pillar.icon size={26} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CURATED ROYAL CATEGORIES */}
      <section className="royal-categories-section">
        <div className="royal-container">
          <div className="section-header">
            <span className="section-subtitle">Curated Haute Collections</span>
            <h2 className="section-title">Royal Categories</h2>
            <div className="section-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond">✦</span>
              <span className="divider-line right"></span>
            </div>
          </div>

          <div className="categories-grid">
            {homeCategories.map((cat, idx) => (
              <motion.div 
                key={idx} 
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -8 }}
              >
                <Link to={cat.link} className="category-link">
                  <div className="category-image-wrap">
                    <img src={cat.image} alt={cat.name} className="category-thumb" />
                    <div className="category-overlay">
                      <span className="explore-text">EXPLORE <ArrowRight size={14} /></span>
                    </div>
                  </div>
                  <div className="category-info">
                    <h3>{cat.name}</h3>
                    <p>{cat.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRENDING MASTERPIECES */}
      <section className="royal-trending-section">
        <div className="royal-container">
          <div className="section-header">
            <span className="section-subtitle">Handcrafted Grandeur</span>
            <h2 className="section-title">Trending Masterpieces</h2>
            <div className="section-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond">✦</span>
              <span className="divider-line right"></span>
            </div>
          </div>

          <motion.div 
            className="trending-showcase-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trendingMasterpieces.map((item) => (
              <motion.div 
                key={item.id} 
                className="masterpiece-card"
                variants={itemVariants}
                whileHover={{ translateY: -8 }}
              >
                <div className="masterpiece-image-holder">
                  <span className="badge-tag">{item.tag}</span>
                  <img src={item.image} alt={item.name} className="masterpiece-img" />
                </div>
                
                <div className="masterpiece-body">
                  <span className="purity-indicator">{item.purity}</span>
                  <h3 className="masterpiece-name">{item.name}</h3>
                  
                  <div className="rating-row">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                      ))}
                    </div>
                    <span className="review-count">({item.reviews} reviews)</span>
                  </div>

                  <div className="pricing-row">
                    <div className="prices">
                      <span className="current-price">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="original-price">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <Link to="/products" className="btn btn-royal-gold btn-small">
                      VIEW PIECE
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="view-all-wrapper">
            <Link to="/products" className="btn btn-royal-emerald btn-large">
              VIEW COMPLETE CATALOGUE
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HERITAGE BRAND STORY */}
      <section className="royal-atelier-section">
        <div className="royal-container">
          <div className="atelier-grid">
            <div className="atelier-narrative">
              <span className="section-subtitle">Since 1998</span>
              <h2 className="atelier-title">The Legend of Hirkani & Royal Karigari</h2>
              <p className="atelier-p">
                At HirkaniSaaj, every masterpiece honors the indomitable courage and royal grandeur of Maharashtra. Our hereditary master artisans hand-craft each 22-karat hallmarked Kolhapuri Saaj, Peshwai Thushi, and uncut Polki diamond creation with centuries-old precision.
              </p>
              <p className="atelier-p">
                We believe fine jewellery is an eternal heirloom of honor, emotion, and royal heritage passed with pride across generations.
              </p>
              <div className="atelier-signature">
                <span className="royal-script">HirkaniSaaj Haute Joaillerie</span>
              </div>
            </div>
            <div className="atelier-visual">
              <div className="atelier-img-box">
                <img src="/images/ruby_diamond_necklace.png" alt="HirkaniSaaj Royal Atelier Craftsmanship" className="atelier-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROYAL PRIVÉ VIP BANNER */}
      <section className="royal-vip-section">
        <div className="royal-container">
          <div className="vip-banner-card">
            <div className="vip-crest">✦</div>
            <h2>Join the HirkaniSaaj Privé Circle</h2>
            <p>
              Enjoy private salon appointments, bespoke customization consultations, and complimentary insured worldwide delivery.
            </p>
            <div className="vip-cta-row">
              <Link to="/register" className="btn btn-royal-gold btn-large">
                BECOME A PRIVÉ MEMBER
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
