import React, { useState } from 'react';
import './Board.css';

function Board() {
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
      <header className="header">
        <img src="/bluecap.jpeg" alt="logo" className="logo" />
        <div className="topics">topics &nbsp; Who is my favorite player? &nbsp; game date</div>
      </header>
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
