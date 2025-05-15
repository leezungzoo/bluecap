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
    <div>
      <h2>두번째 페이지</h2>
      <h3>Question.2</h3>
      <p>나는 터프하고 강한 인상을 주는 사람을 선호한다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default TwoPage;
