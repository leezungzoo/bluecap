// ElevenPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function ElevenPage() {
  const location = useLocation();
  const yesCount = location.state?.yesCount || 0;

  return (
    <div>
      <h2>열한 번째 페이지</h2>
      <h4>당신에게 딱 맞는 선수는</h4>
      {yesCount === 10 && <p>노시환 입니다!</p>}
      {yesCount === 9 && <p>문현빈 입니다!</p>}
      {yesCount === 8 && <p>채은성 입니다!</p>}
      {yesCount === 7 && <p>황영묵 입니다!</p>}
      {yesCount === 6 && <p>이진영 입니다!</p>}
      {yesCount === 5 && <p>플로리얼 입니다!</p>}
      {yesCount === 4 && <p>최재훈 입니다!</p>}
      {yesCount === 3 && <p>최인호 입니다!</p>}
      {yesCount === 2 && <p>심우준 입니다!</p>}
      {yesCount === 1 && <p>안치홍 입니다!</p>}
      {yesCount === 0 && <p>김태연 입니다!</p>}
      
    </div>
  );
}

export default ElevenPage;
