import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

  return (
    <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.2</p>
      <h3>나는 터프하고 강한 인상을 주는 사람을 선호한다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  );
}

export default TwoPage;
