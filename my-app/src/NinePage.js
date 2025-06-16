import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Page.css';
import Footer from './components/Footer';
import './styles/Footer.css';

function NinePage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/ten', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/ten', { state: { yesCount: prevCount } });
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
    <div className="welcomepage-container">
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.9</p>
      <h3>나는 목표한 바를 이뤘을 때의 행복이 소소한 행복보다 더 가치 있다고 생각한다</h3>
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

export default NinePage;
