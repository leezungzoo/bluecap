import React from 'react';
import '../styles/Board.css';

const BoardWrite = () => {
  return (
    <div className="board-container">
      <div className="board-main">
        <div className="board-title">게시글 작성</div>
        <form>
          <input type="text" placeholder="제목을 입력하세요" className="form-control" style={{ marginBottom: '1rem' }} />
          <textarea placeholder="내용을 입력하세요" className="form-control" style={{ height: '300px' }}></textarea>
          <button className="post-button" style={{ marginTop: '1rem' }}>등록</button>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite;