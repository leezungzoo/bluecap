// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';

import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import OnePage from './OnePage';
import TwoPage from './TwoPage';
import ThreePage from './ThreePage';
import FourPage from './FourPage';
import FivePage from './FivePage';
import SixPage from './SixPage';
import SevenPage from './SevenPage';
import EightPage from './EightPage';
import NinePage from './NinePage';
import TenPage from './TenPage';
import ElevenPage from './ElevenPage';

import Login from './Login';
import Signup from './Signup';
import Shop from './components/Shop';

import BoardList from './components/BoardList';
import BoardDetail from './components/BoardDetail';
import BoardWrite from './components/BoardWrite';
import Home from './components/Home';

import Cart from './components/Cart';
import Purchase from './components/Purchase';
import PlayerStatus from './PlayerStatus';
import News from './components/News';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedUser && storedIsLoggedIn === 'true') {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', { method: 'POST' });
      const data = await response.json();

      if (!data.success) {
        alert('로그아웃 실패');
        return;
      }

      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');

    } catch (error) {
      console.error('로그아웃 요청 중 에러 발생:', error);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
  };
  const MainLayout = () => (
    <>
      <NavBar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/one" element={<OnePage />} />
          <Route path="/two" element={<TwoPage />} />
          <Route path="/three" element={<ThreePage />} />
          <Route path="/four" element={<FourPage />} />
          <Route path="/five" element={<FivePage />} />
          <Route path="/six" element={<SixPage />} />
          <Route path="/seven" element={<SevenPage />} />
          <Route path="/eight" element={<EightPage />} />
          <Route path="/nine" element={<NinePage />} />
          <Route path="/ten" element={<TenPage />} />
          <Route path="/eleven" element={<ElevenPage />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/post/:id" element={<BoardDetail />} />
          <Route path="/write" element={<BoardWrite />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/Status" element={<PlayerStatus />} />
          <Route path="/News" element={<News />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;