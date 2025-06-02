import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BoardSidebar from './BoardSidebar';
import '../styles/Board.css';

const BoardDetail = () => {
  const { id } = useParams();

  return (
    <div className="board-container">
      <div className="board-main">
        <Link className="board-title" to={`/board`}>게시판</Link>
        <Link to="/write" className="post-button">글쓰기</Link>

        <div className="post-content">
          <h2>제발 김경문은 현구장에 두고 가자</h2>
          <p className="text-muted">익명의 한화팬 | 2025.05.28 | 20 Comments</p>
          <img src="/sample.jpg" alt="대표 이미지" />
          <p>더미 포스트 본문 더미 터스트 본문</p>

          <div className="tags">
            Tags: <span className="sidebar-tag">경기</span> <span className="sidebar-tag">감독</span>
          </div>
        </div>

        <div className="comment-list">
          <div className="comment">
            <p><strong>Laura Hipster</strong> - Oct 3, 2022</p>
            <p>댓글 내용입니다.</p>
            <div className="reply">
              <p><strong>Laura Hipster</strong> (대댓글)</p>
              <p>대댓글 내용입니다.</p>
            </div>
          </div>

          <div className="pagination">
            <button className="page-button active">1</button>
            <button className="page-button">2</button>
            <button className="page-button">3</button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <textarea className="form-control" placeholder="게시글 입력란"></textarea>
            <button className="post-button" style={{ marginTop: '0.5rem' }}>등록</button>
          </div>
        </div>
      </div>

      <BoardSidebar />
    </div>
  );
};

export default BoardDetail;