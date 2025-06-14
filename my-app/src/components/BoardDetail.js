import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BoardSidebar from './BoardSidebar'; // BoardDetail에서는 직접 사용하지 않지만, 구조상 있으면 유지
import '../styles/Board.css';

const BoardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 목록 상태
  const [newCommentContent, setNewCommentContent] = useState(''); // 새 댓글 내용
  const [newCommentAuthor, setNewCommentAuthor] = useState('익명의 한화팬'); // 새 댓글 작성자 (기본값)
  const [replyContent, setReplyContent] = useState({}); // 대댓글 내용 (댓글 ID를 키로 가짐)
  const [replyAuthor, setReplyAuthor] = useState('익명의 한화팬'); // 대댓글 작성자 (기본값)
  const [showReplyInput, setShowReplyInput] = useState({}); // 대댓글 입력창 표시 여부

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
          return; // 게시글 불러오기 실패 시 댓글 로드 중단
        }

        // 댓글 불러오기
        const commentsResponse = await fetch(`http://localhost:5000/api/posts/${id}/comments`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        } else {
          console.error('Failed to fetch comments:', commentsResponse.statusText);
        }
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
        const addedComment = await response.json();
        setComments(prevComments => [addedComment.comment, ...prevComments]); // 새 댓글을 목록 맨 앞에 추가
        setNewCommentContent(''); // 입력 필드 초기화
      } else {
        const errorData = await response.json();
        alert('댓글 작성 실패: ' + (errorData.message || '알 수 없는 오류'));
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
        const addedReply = await response.json();
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === commentId
              ? { ...comment, replies: [...comment.replies, addedReply.reply] }
              : comment
          )
        );
        setReplyContent(prev => ({ ...prev, [commentId]: '' })); // 대댓글 입력 필드 초기화
        setShowReplyInput(prev => ({ ...prev, [commentId]: false })); // 대댓글 입력창 닫기
      } else {
        const errorData = await response.json();
        alert('대댓글 작성 실패: ' + (errorData.message || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('네트워크 오류 또는 서버에 연결할 수 없습니다.');
    }
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
      {/* BoardDetail에서는 BoardSidebar를 직접 사용하지 않을 수 있지만, 레이아웃을 위해 유지 */}
      {/* <BoardSidebar /> */}
      <div className="board-main">
        <div className="post-detail">
          <Link className="board-title" to={`/board`}>게시판</Link> {/* BoardList로 돌아가는 링크 */}
          <h2>{post.title}</h2>
          <p className="text-muted">
            익명의 한화팬 | {post.date}
          </p>
          {post.image && (
            <img src={`http://localhost:5000/uploads/${post.image}`} alt="대표 이미지" style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem', borderRadius: '8px' }} />
          )}
          <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p> {/* 개행 문자 유지를 위해 pre-wrap */}

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
            <h4>댓글 ({comments.length})</h4> {/* 댓글 수 표시 */}
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
                <div style={{ clear: 'both' }}></div> {/* float 해제 */}
            </div>

            {comments.length === 0 ? (
                <p>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
            ) : (
                comments.map(comment => (
                    <div className="comment" key={comment.id}>
                        <p><strong>{comment.author || '익명의 한화팬'}</strong> - {comment.date}</p>
                        <p>{comment.content}</p>
                        <button
                            className="post-button"
                            style={{ background: '#6c757d', padding: '5px 10px', fontSize: '0.8rem', float: 'right' }}
                            onClick={() => setShowReplyInput(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                        >
                            답글
                        </button>
                        <div style={{ clear: 'both' }}></div> {/* float 해제 */}

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
                                <p><strong>{reply.author || '익명의 한화팬'}</strong> (답글) - {reply.date}</p>
                                <p>{reply.content}</p>
                            </div>
                        ))}
                    </div>
                ))
            )}

            <div className="pagination">
                <button className="page-button active">1</button>
                <button className="page-button">2</button>
                <button className="page-button">3</button>
            </div>
        </div>
      </div>
      {/* BoardDetail에서 사이드바를 필요로 하지 않는다면 이 부분을 제거해도 됩니다. */}
      {/* <BoardSidebar /> */}
    </div>
  );
};

export default BoardDetail;