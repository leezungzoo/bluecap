import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SixPage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/seven', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/seven', { state: { yesCount: prevCount } });
  };

  return (
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.6</p>
      <h3>나는 침착함보단 빠르고 역동적인 것을 선호한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  );
}

export default SixPage;
