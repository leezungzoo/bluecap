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
    <div>
      <h2>열번째 페이지</h2>
      <h3>Question.10</h3>
      <p>나는 외모나 매력이 실력만큼 중요하다고 생각한다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default TenPage;
