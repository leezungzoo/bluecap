import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TenPage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/eleven', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/eleven', { state: { yesCount: prevCount } });
  };

  return (
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.10</p>
      <h3>나는 외모나 매력이 실력만큼 중요하다고 생각한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  );
}

export default TenPage;
