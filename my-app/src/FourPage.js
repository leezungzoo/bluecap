import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FourPage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/five', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/five', { state: { yesCount: prevCount } });
  };

  return (
    <div>
      <h2>네번째 페이지</h2>
      <h3>Question.4</h3>
      <p>나는 현재보다 미래의 가치가 더 중요하다고 생각한다 </p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default FourPage;
