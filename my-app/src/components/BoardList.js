import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoardSidebar from './BoardSidebar';
import NavBar from './NavBar';
import Modal from 'react-modal';
import '../styles/Board.css';

Modal.setAppElement('#root'); // 모달 접근성을 위한 설정 (public/index.html의 root 엘리먼트에 연결)

const BoardList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]); // 게시글 데이터를 상태로 관리

  // 글쓰기 폼 상태
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null); // File 객체
  const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 배열

  // BoardSidebar.js에 있는 태그 목록
  const tagsList = ['경기', '선수', '감독', '시구', '직관 일기'];

  // 게시글 목록 불러오기
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts'); // Node.js 백엔드 API 엔드포인트
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // 컴포넌트 마운트 시 게시글 불러오기
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    // 모달 열 때 폼 상태 초기화
    setPostTitle('');
    setPostContent('');
    setPostImage(null);
    setSelectedTags([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTags(prev => [...prev, value]);
    } else {
      setSelectedTags(prev => prev.filter(tag => tag !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('content', postContent);
    if (postImage) {
      formData.append('image', postImage);
    }
    // Node.js (Express + Multer): 동일한 이름의 여러 필드를 배열로 자동으로 파싱
    selectedTags.forEach(tag => {
      formData.append('tags', tag);
    });

    try {
      const response = await fetch('http://localhost:5000/api/posts', { // Node.js 백엔드 API 엔드포인트
        method: 'POST',
        body: formData, // FormData는 'Content-Type': 'multipart/form-data'를 자동으로 설정
      });

      if (response.ok) {
        alert('게시글이 성공적으로 작성되었습니다!');
        closeModal();
        fetchPosts(); // 게시글 작성 후 목록 새로고침
      } else {
        const errorData = await response.json();
        alert('게시글 작성 실패: ' + (errorData.message || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('네트워크 오류 또는 서버에 연결할 수 없습니다.');
    }
  };

  return (
    <div>
      <NavBar />
    <div className="board-container">
      <div className="board-main">
        <Link className="board-title" to={`/board`}>게시판</Link>
        <button onClick={openModal} className="post-button">글쓰기</button>
        
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="게시글 작성"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="board-container">
            <div className="board-main" style={{ paddingTop: '0px' }}>
              <h2 className="board-title">새 게시글 작성</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="postTitle">제목</label>
                  <input
                    type="text"
                    id="postTitle"
                    placeholder="제목을 입력하세요"
                    className="form-control"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="postContent">내용</label>
                  <textarea
                    id="postContent"
                    placeholder="내용을 입력하세요"
                    className="form-control"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                    style={{ height: '200px', width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', resize: 'vertical' }}
                  ></textarea>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="postImage">이미지</label>
                  <input
                    type="file"
                    id="postImage"
                    accept="image/*"
                    onChange={(e) => setPostImage(e.target.files[0])}
                    style={{ padding: '10px 0' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>태그</label>
                  <div className="tag-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {tagsList.map(tag => (
                      <label key={tag} style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '8px 12px', borderRadius: '20px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          value={tag}
                          checked={selectedTags.includes(tag)}
                          onChange={handleTagChange}
                          style={{ marginRight: '5px' }}
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" className="post-button" style={{ marginTop: '1rem', float: 'none' }}>게시글 작성</button>
                <button type="button" onClick={closeModal} className="post-button" style={{ marginTop: '1rem', marginLeft: '10px', backgroundColor: '#ccc', float: 'none' }}>취소</button>
              </form>
            </div>
          </div>
        </Modal>
  
        <div className="post-list">
          {posts.map(post => (
            <div className="post-item" key={post.id} style={{ marginBottom: '1rem', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
              {post.image && (
                <img src={`http://localhost:5000/uploads/${post.image}`} alt="게시글 이미지" style={{ width: '100px', height: '100px', objectFit: 'cover', float: 'left', marginRight: '1rem', borderRadius: '5px' }} />
              )}
              <div>
                <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
                <p className="text-muted" style={{ fontSize: '0.9rem', color: '#888' }}>
                  <img src="/images/calendar.svg" alt="calendar" style={{ verticalAlign: 'middle', marginRight: '5px', width: '16px', height: '16px' }}/>
                  {post.date}
                </p>
                {/* 게시글 내용 미리보기 - 100자까지만 표시 */}
                <p style={{ fontSize: '1rem', color: '#333' }}>{post.content.substring(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
                <div style={{ clear: 'both' }}>
                  {post.tags && post.tags.map(tag => (
                    <span key={tag} className="sidebar-tag" style={{ marginRight: '5px', marginBottom: '5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="page-button active">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
        </div>
      </div>

      <BoardSidebar />
    </div>
    </div>
  );
};

export default BoardList;