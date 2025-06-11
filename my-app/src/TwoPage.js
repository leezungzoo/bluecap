import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';

function TwoPage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/three', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/three', { state: { yesCount: prevCount } });
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
    <div className="welcomepage-container"></div>
    
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.2</p>
      <h3>나는 터프하고 강한 인상을 주는 사람을 선호한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  </div>
  );
}

export default TwoPage;
