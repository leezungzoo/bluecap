import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Board.css';

function Board() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const Quiz = () => {
    navigate('/one'); // OnePage로 이동
  };

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (input.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }
    setComments([...comments, input]);
    setInput('');
  };

  return (
    <div>
      <div id="header">
        <div id="hd">
          <img
            src="bluecap.jpeg"
            height="75px"
            width="100"
            alt="bluecap"
            onClick={goHome} 
            style={{ cursor: 'pointer' }} 
          />
        <ul id="navigation">
                <li onClick={() => navigate('/board')}>Board</li>
                <li onClick={Quiz}>Who is my favorite player?</li>
                <li>game date</li>
                <li onClick={() => navigate('/Login')}>Sign In</li>
            </ul>
            </div>
      </div>
      <main className="main">
        <div className="board-section">
          <h3>💬 게시판</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="게시글을 입력하세요."
          />
          <button onClick={handleAddComment}>등록</button>
          <ul>
            {comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Board;
