import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ThreePage() {
  const location = useLocation();
  const prevCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = prevCount + 1;
    navigate('/four', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/four', { state: { yesCount: prevCount } });
  };

  return (
    <div>
      <h2>세번째 페이지</h2>
      <h3>Question.3</h3>
      <p>나는 '꾸준한 노력형' 보다 '화끈함'을 더 선호한다 </p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default ThreePage;
