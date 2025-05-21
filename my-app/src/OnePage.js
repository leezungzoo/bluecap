import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css';

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
  <div className = "container">
    <div className = "page">
      <p style={{ textAlign: 'left' }}> Question.1</p>
      <h3>나는 프로젝트를 할 때 '리더스타일'이다</h3>
      <button className = "button" onClick={handleYes}>O</button>
      <button className = "button" onClick={handleNo}>X</button>
    </div>
  </div>
  );
}

export default OnePage;
