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
    <div>
      <h2>여덟번째 페이지</h2>
      <h3>Question.8</h3>
      <p>나는 패기보단 노련미를 선호한다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default EightPage;
