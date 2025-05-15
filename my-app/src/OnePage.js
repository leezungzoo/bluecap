import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OnePage() {
  const [yesCount, setYesCount] = useState(0);
  const navigate = useNavigate();

  const handleYes = () => {
    const updated = yesCount + 1;
    navigate('/two', { state: { yesCount: updated } });
  };

  const handleNo = () => {
    navigate('/two', { state: { yesCount } });
  };

  return (
    <div>
      <h2>첫번째 페이지</h2>
      <h3>Question.1</h3>
      <p>나는 팀을 이끄는 리더 스타일이다</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default OnePage;
