// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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


import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} /> 
        <Route path="/home" element={<Home />} />
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

        <Route path="/login" element={<Login onLogin={() => setIsLogin(true)} />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
