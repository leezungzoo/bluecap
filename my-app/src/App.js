// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import OnePage from './OnePage';
import TwoPage from './TwoPage';
import ThreePage from './ThreePage';
import FourPage from './FourPage';
import FivePage from './FivePage'; //파일명 대소문자 수정
import SixPage from './SixPage';
import SevenPage from './SevenPage';
import EightPage from './EightPage';
import NinePage from './NinePage';
import TenPage from './TenPage';
import ElevenPage from './ElevenPage';

import Login from './Login';
import Board from './Board';


function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
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

        <Route path="/board" element={<Board />} />

        <Route path="/login" element={<Login onLogin={() => setIsLogin(true)} />} />
        <Route path="/HomePage" element={<HomePage />} />

      </Routes>
    </Router>
  );
}

export default App;
