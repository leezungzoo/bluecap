import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ThreePage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/four', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/four', { state: { yesCount: prevCount } });
  };

  return (
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.3</p>
      <h3>나는 '꾸준한 노력형' 보다 '화끈함'을 더 선호한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  );
}

export default ThreePage;
