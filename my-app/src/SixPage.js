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
    <div>
      <h2>여섯번째 페이지</h2>
      <h3>Question.6</h3>
      <p>나는 침착함보단 빠르고 역동적인 것을 선호한다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default SixPage;
