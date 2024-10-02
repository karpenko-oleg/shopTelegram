import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './page/home/Home.tsx';
import Navigation from './componets/navigation/Navigation.tsx';
import Cart from './page/cart/Cart';
import Profile from './page/profile/Profile';
import Header from './componets/header/Header.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Navigation />
      </Router>
    </div>
  );
};

export default App;