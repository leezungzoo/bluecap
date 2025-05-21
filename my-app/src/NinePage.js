import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

  return (
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.9</p>
      <h3>나는 목표한 바를 이뤘을 때의 행복이 소소한 행복보다 더 가치 있다고 생각한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  );
}

export default NinePage;
