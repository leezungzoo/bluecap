import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css';

function OnePage() {
  const [yesCount, setYesCount] = useState(0);
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = yesCount + 1;
    navigate('/two', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/two', { state: { yesCount } });
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
      <p style={{ textAlign: 'left' }}> Question.1</p>
      <h3>나는 프로젝트를 할 때 '리더스타일'이다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  </div>
  );
}

export default OnePage;
