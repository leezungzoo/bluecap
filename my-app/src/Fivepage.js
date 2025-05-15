import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FivePage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/six', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/six', { state: { yesCount: prevCount } });
  };

  return (
    <div>
      <h2>다섯번째 페이지</h2>
      <h3>Question.5</h3>
      <p>나는 공격보다 수비가 더 중요하다고 생각한다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default FivePage;
