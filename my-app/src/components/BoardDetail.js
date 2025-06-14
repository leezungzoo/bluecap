import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Board.css';

const BoardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('익명의 한화팬');
  const [replyContent, setReplyContent] = useState({});
  const [replyAuthor, setReplyAuthor] = useState('익명의 한화팬');
  const [showReplyInput, setShowReplyInput] = useState({});

  // 댓글 페이지네이션 상태
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [totalCommentPages, setTotalCommentPages] = useState(1);
  const commentsPerPage = 6; // 페이지당 댓글 수 6개로 고정

  // 댓글 불러오는 함수를 별도로 정의
  const fetchComments = async (page = 1) => {
    try {
      const commentsResponse = await fetch(`http://localhost:5000/api/posts/${id}/comments?page=${page}&limit=${commentsPerPage}`); // limit 값을 백엔드로 전달
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        setComments(commentsData.comments);
        setTotalCommentPages(commentsData.totalPages);
        setCurrentCommentPage(commentsData.currentPage);
      } else {
        console.error('Failed to fetch comments:', commentsResponse.statusText);
        const errorData = await commentsResponse.json();
        console.error('Server error response:', errorData);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // 게시글 상세 정보 불러오기
        const postResponse = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (postResponse.ok) {
          const postData = await postResponse.json();
          setPost(postData);
        } else {
          const errorData = await postResponse.json();
          setError(errorData.message || '게시글을 불러오는 데 실패했습니다.');
          console.error('Failed to fetch post detail:', postResponse.statusText);
          console.error('Server error response:', errorData);
          return;
        }

        // 초기 댓글 불러오기 (첫 페이지)
        fetchComments(1);
      } catch (err) {
        setError('네트워크 오류 또는 서버에 연결할 수 없습니다.');
        console.error('Error fetching data:', err);
      }
    };

    fetchPostAndComments();
  }, [id]);


  const handleCommentSubmit = async () => {
    if (!newCommentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: newCommentAuthor, content: newCommentContent }),
      });

      if (response.ok) {
        // 댓글 작성 후 첫 페이지 댓글 목록 새로고침
        setNewCommentContent('');
        fetchComments(1); // 댓글 작성 후 첫 페이지로 이동
      } else {
        const errorData = await response.json();
        alert('댓글 작성 실패: ' + (errorData.message || '알 수 없는 오류'));
        console.error('Comment submission failed:', errorData);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('네트워크 오류 또는 서버에 연결할 수 없습니다.');
    }
  };

  const handleReplySubmit = async (commentId) => {
    const content = replyContent[commentId];
    if (!content || !content.trim()) {
      alert('대댓글 내용을 입력해주세요.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: replyAuthor, content: content }),
      });

      if (response.ok) {
        setReplyContent(prev => ({ ...prev, [commentId]: '' }));
        // 'comment.id' 대신 'commentId' 사용
        setShowReplyInput(prev => ({ ...prev, [commentId]: false })); 
        // 대댓글 작성 후 댓글 목록 새로고침 (현재 페이지 유지)
        fetchComments(currentCommentPage);
      } else {
        const errorData = await response.json();
        alert('대댓글 작성 실패: ' + (errorData.message || '알 수 없는 오류'));
        console.error('Reply submission failed:', errorData);
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('네트워크 오류 또는 서버에 연결할 수 없습니다.');
    }
  };

  const handleCommentPageChange = (pageNumber) => {
    fetchComments(pageNumber);
  };

  const renderCommentPaginationButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentCommentPage - 2);
    const endPage = Math.min(totalCommentPages, currentCommentPage + 2);

    if (currentCommentPage > 1) {
      pageButtons.push(
        <button key="prev-comment" className="page-button" onClick={() => handleCommentPageChange(currentCommentPage - 1)}>
          &lt;
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={`comment-page-${i}`}
          className={`page-button ${i === currentCommentPage ? 'active' : ''}`}
          onClick={() => handleCommentPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentCommentPage < totalCommentPages) {
      pageButtons.push(
        <button key="next-comment" className="page-button" onClick={() => handleCommentPageChange(currentCommentPage + 1)}>
          &gt;
        </button>
      );
    }

    return pageButtons;
  };

  if (error) {
    return (
      <div className="board-container">
        <div className="board-main">
          <h2 style={{ color: 'red' }}>오류: {error}</h2>
          <Link to="/board" className="post-button">목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="board-container">
        <div className="board-main">
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="board-main">
        <div className="post-detail">
          <Link className="board-title" to={`/board`}>게시판</Link>
          <h2>{post.title}</h2>
          <p className="text-muted">
            익명의 한화팬 | {new Date(post.date).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}
          </p>
          {post.image && (
            <img src={`http://localhost:5000/uploads/${post.image}`} alt="대표 이미지" style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem', borderRadius: '8px' }} />
          )}
          <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

          <div className="tags" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            {post.tags && post.tags.length > 0 && (
                <>
                    <strong>태그:</strong> {' '}
                    {post.tags.map(tag => (
                      <span key={tag} className="sidebar-tag">{tag}</span>
                    ))}
                </>
            )}
          </div>
        </div>

        <div className="comment-list">
            <h4>댓글 ({comments.length} / 총 {totalCommentPages} 페이지)</h4>
            <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <textarea
                    className="form-control"
                    placeholder="댓글을 입력하세요"
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)}
                    style={{ height: '80px', marginBottom: '0.5rem' }}
                ></textarea>
                <input
                    type="text"
                    className="form-control"
                    placeholder="작성자 (선택 사항)"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    style={{ width: '150px', display: 'inline-block', marginRight: '0.5rem' }}
                />
                <button onClick={handleCommentSubmit} className="post-button" style={{ marginTop: '0.5rem', float: 'right' }}>등록</button>
                <div style={{ clear: 'both' }}></div>
            </div>

            {comments.length === 0 && currentCommentPage === 1 ? (
                <p>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
            ) : comments.length === 0 ? (
                <p>해당 페이지에 댓글이 없습니다.</p>
            ) : (
                comments.map(comment => (
                    <div className="comment" key={comment.id}>
                        <p><strong>{comment.author || '익명의 한화팬'}</strong> - {new Date(comment.date).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}</p>
                        <p>{comment.content}</p>
                        <button
                            className="post-button"
                            style={{ background: '#6c757d', padding: '5px 10px', fontSize: '0.8rem', float: 'right' }}
                            onClick={() => setShowReplyInput(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                        >
                            답글
                        </button>
                        <div style={{ clear: 'both' }}></div>

                        {showReplyInput[comment.id] && (
                            <div style={{ marginTop: '1rem', border: '1px solid #eee', padding: '1rem', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                                <textarea
                                    className="form-control"
                                    placeholder="답글 내용을 입력하세요"
                                    value={replyContent[comment.id] || ''}
                                    onChange={(e) => setReplyContent(prev => ({ ...prev, [comment.id]: e.target.value }))}
                                    style={{ height: '60px', marginBottom: '0.5rem' }}
                                ></textarea>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="작성자 (선택 사항)"
                                    value={replyAuthor}
                                    onChange={(e) => setReplyAuthor(e.target.value)}
                                    style={{ width: '150px', display: 'inline-block', marginRight: '0.5rem' }}
                                />
                                <button onClick={() => handleReplySubmit(comment.id)} className="post-button" style={{ background: '#28a745', padding: '5px 10px', fontSize: '0.8rem', float: 'right' }}>등록</button>
                                <div style={{ clear: 'both' }}></div>
                            </div>
                        )}

                        {comment.replies && comment.replies.map(reply => (
                            <div className="reply" key={reply.id}>
                                <p><strong>{reply.author || '익명의 한화팬'}</strong> (답글) - {new Date(reply.date).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}</p>
                                <p>{reply.content}</p>
                            </div>
                        ))}
                    </div>
                ))
            )}

            <div className="pagination">
                {renderCommentPaginationButtons()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;