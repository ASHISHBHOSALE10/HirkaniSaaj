import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Award, Truck, Lock } from 'lucide-react';
import './Home.css';

function Home() {
  const features = [
    { icon: Award, title: 'प्रामाणिक आभूषण', description: '100% प्रामाणिक और सर्टिफाइड आभूषण' },
    { icon: Truck, title: 'तेज डिलीवरी', description: '2-3 दिनों में आपके दरवाज़े पर पहुंच जाता है' },
    { icon: Lock, title: 'सुरक्षित भुगतान', description: 'आपकी जानकारी पूरी तरह सुरक्षित है' },
    { icon: ShoppingBag, title: 'आसान रिटर्न', description: '7 दिन की वापसी गारंटी' },
  ];

  const trendingJewelry = [
    { id: 1, name: 'सोने की अंगूठी', price: '₹15,999', image: '💍', category: 'rings' },
    { id: 2, name: 'हीरे की नेकलेस', price: '₹45,999', image: '✨', category: 'necklace' },
    { id: 3, name: 'सोने के कंगन', price: '₹12,999', image: '✨', category: 'bangles' },
    { id: 4, name: 'पर्ल की मालाएं', price: '₹9,999', image: '🔱', category: 'necklace' },
  ];

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">रतन लोक में स्वागत है</h1>
          <p className="hero-subtitle">भारतीय परंपरा के साथ विश्वमानी आभूषण संग्रह</p>
          <Link to="/products" className="btn btn-primary btn-large">
            <ShoppingBag size={20} />
            खरीदारी शुरू करें
          </Link>
        </div>
        <div className="hero-image">💎💍✨</div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>हमारी विशेषताएं</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <feature.icon size={40} className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="trending">
        <h2>ट्रेंडिंग आभूषण</h2>
        <div className="products-showcase">
          {trendingJewelry.map((item) => (
            <div key={item.id} className="showcase-card">
              <div className="showcase-image">{item.image}</div>
              <h4>{item.name}</h4>
              <p className="price">{item.price}</p>
              <Link to="/products" className="btn btn-outline btn-small">
                देखें
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="cta-content">
          <h2>विशेष छूट - 50% तक बचाएं</h2>
          <p>आज ही रजिस्टर करें और पहली खरीद पर 50% छूट पाएं</p>
          <Link to="/register" className="btn btn-secondary btn-large">
            अभी रजिस्टर करें
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
