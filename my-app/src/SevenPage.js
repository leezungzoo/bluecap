import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SevenPage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/eight', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/eight', { state: { yesCount: prevCount } });
  };

  return (
    <div>
      <h2>일곱번째 페이지</h2>
      <h3>Question.7</h3>
      <p>나는 혼자 돋보이는 것 보다 팀을위해 희생하는 것을 선호한다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default SevenPage;
