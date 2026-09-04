import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import { useCart } from './hooks/useCart';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function AppContent({ cartItems, addToCart, updateQuantity, removeFromCart, user, setUser }) {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar cartCount={cartItems.length} user={user} setUser={setUser} />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/products" element={<PageWrapper><Products onAddToCart={addToCart} /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><Cart items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout cartItems={cartItems} user={user} /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login setUser={setUser} /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><Profile user={user} /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <AppContent
        cartItems={cartItems}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        user={user}
        setUser={setUser}
      />
    </Router>
  );
}

export default App;
