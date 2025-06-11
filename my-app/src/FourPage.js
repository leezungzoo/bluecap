import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FourPage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/five', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/five', { state: { yesCount: prevCount } });
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
    <div id="header">
        <div id="hd">
          <img
            src="bluecap.jpeg"
            height="75px"
            width="100"
            alt="bluecap"
            onClick={goHome}
            style={{ cursor: 'pointer' }}
          />
          <ul id="navigation">
            <li onClick={() => navigate('/board')}>Board</li>
            <li onClick={goToQuiz}>Who is my favorite player?</li>
            <li>game date</li>
            <li onClick={() => navigate('/Login')}>Sign In</li>
          </ul>
        </div>
      </div>
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.4</p>
      <h3>나는 현재보다 미래의 가치가 더 중요하다고 생각한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  </div>
  );
}

export default FourPage;
