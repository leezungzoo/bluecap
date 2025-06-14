import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BoardSidebar from './BoardSidebar';
import '../styles/Board.css';

const BoardDetail = () => {
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const [post, setPost] = useState(null); // 게시글 데이터를 상태로 관리
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`); // Node.js 백엔드 API 엔드포인트
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || '게시글을 불러오는 데 실패했습니다.');
          console.error('Failed to fetch post detail:', response.statusText);
        }
      } catch (err) {
        setError('네트워크 오류 또는 서버에 연결할 수 없습니다.');
        console.error('Error fetching post detail:', err);
      }
    };

    fetchPostDetail();
  }, [id]); // id가 변경될 때마다 게시글 다시 불러오기

  if (error) {
    return (
      <div className="board-container">
        <div className="board-main">
          <p className="error-message">{error}</p>
          <Link className="post-button" to="/board">목록으로 돌아가기</Link>
        </div>
        <BoardSidebar />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="board-container">
        <div className="board-main">
          <p>게시글을 불러오는 중...</p>
        </div>
        <BoardSidebar />
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="board-main">
        <Link className="board-title" to={`/board`}>게시판</Link>
        {/* '글쓰기' 버튼은 BoardList에서만 보여주도록 함 */}
        {/* <Link to="/write" className="post-button">글쓰기</Link> */} 

        <div className="post-content">
          <h2>{post.title}</h2>
          <p className="text-muted">
            {/* 작성자 정보가 없으므로 '익명의 한화팬'으로 사용 */}
            익명의 한화팬 | {post.date} {/* 댓글 수 구현 예정 */}
          </p>
          {post.image && (
            <img src={`http://localhost:5000/uploads/${post.image}`} alt="대표 이미지" />
          )}
          <p>{post.content}</p>

          <div className="tags">
            Tags: {post.tags && post.tags.map(tag => (
              <span key={tag} className="sidebar-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="comment-list">
          {/* 더미 댓글 */}
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