import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EightPage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/nine', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/nine', { state: { yesCount: prevCount } });
  };

  return (
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.8</p>
      <h3>나는 패기보단 노련미를 선호한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  );
}

export default EightPage;
