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
    <div>
      <h2>아홉번째 페이지</h2>
      <h3>Question.9</h3>
      <p>나는 목표한 바를 이뤘을 때의 행복이 소소한 행복보다 더 가치 있다고 생각한다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default NinePage;
