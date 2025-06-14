import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Page.css';
import Footer from './components/Footer';
import './styles/Footer.css';
import NavBar from './components/NavBar';

function FivePage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/six', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/six', { state: { yesCount: prevCount } });
  };

    // 홈으로 새로고침
  const goHome = () => {
    window.location.href = '/'; 
  };

    // 퀴즈 페이지로 이동
  const goToQuiz = () => {
    navigate('/one');
  };

  return (
  <div>
    <NavBar />
    <div className="welcomepage-container">

    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.5</p>
      <h3>나는 공격보다 수비가 더 중요하다고 생각한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  </div>
    <div className='Footer-space'>
      <Footer /> 
      </div>
      </div>
  );
}

export default FivePage;
