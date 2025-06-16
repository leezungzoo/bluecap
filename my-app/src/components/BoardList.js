import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BoardSidebar from './BoardSidebar';
import Modal from 'react-modal';
import '../styles/Board.css';

Modal.setAppElement('#root');

const BoardList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null); // File 객체
  const [selectedTags, setSelectedTags] = useState([]);

  const tagsList = ['경기', '선수', '감독', '시구', '직관 일기'];

  const location = useLocation();
  const navigate = useNavigate();

  // 필터링 및 페이지네이션 관련 상태
  const [currentFilter, setCurrentFilter] = useState('latest'); // 'latest', 'comments'
  const [currentTag, setCurrentTag] = useState(''); // 선택된 태그
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const fetchPosts = async (filter = 'latest', tag = '', page = 1) => {
    try {
      const queryParams = new URLSearchParams();
      if (filter && filter !== 'latest') { // 'latest'는 기본값이므로 쿼리에 포함시키지 않음
        queryParams.append('filter', filter);
      }
      if (tag) {
        queryParams.append('tag', tag);
      }
      queryParams.append('page', page);
      
      const queryString = queryParams.toString();
      const url = `http://localhost:5000/api/posts${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } else {
        console.error('Failed to fetch posts:', response.statusText);
        const errorData = await response.json();
        console.error('Server error response:', errorData);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filterFromUrl = queryParams.get('filter') || 'latest';
    const tagFromUrl = queryParams.get('tag') || '';
    const pageFromUrl = parseInt(queryParams.get('page')) || 1;

    setCurrentFilter(filterFromUrl);
    setCurrentTag(tagFromUrl);
    setCurrentPage(pageFromUrl);

    fetchPosts(filterFromUrl, tagFromUrl, pageFromUrl);
  }, [location.search]);

  const openModal = () => {
    setIsModalOpen(true);
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
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('content', postContent);
    if (postImage) {
      formData.append('image', postImage);
    }
    selectedTags.forEach(tag => {
      formData.append('tags', tag);
    });

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('게시글이 성공적으로 작성되었습니다!');
        closeModal();
        // 게시글 작성 후 첫 페이지로 이동하며 목록 새로고침
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', 1);
        if (currentFilter && currentFilter !== 'latest') {
            queryParams.set('filter', currentFilter);
        } else {
            queryParams.delete('filter');
        }
        if (currentTag) {
            queryParams.set('tag', currentTag);
        } else {
            queryParams.delete('tag');
        }
        navigate(`/board?${queryParams.toString()}`);
      } else {
        const errorData = await response.json();
        alert('게시글 작성 실패: ' + (errorData.message || '알 수 없는 오류'));
        console.error('Post submission failed:', errorData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('네트워크 오류 또는 서버에 연결할 수 없습니다.');
    }
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('filter', filter);
    queryParams.set('page', 1); // 필터 변경 시 첫 페이지로
    if (currentTag) {
        queryParams.set('tag', currentTag);
    } else {
        queryParams.delete('tag');
    }
    navigate(`/board?${queryParams.toString()}`);
  };

  const handleTagClick = (tag) => {
    const newTag = currentTag === tag ? '' : tag; // 같은 태그 다시 클릭 시 해제
    setCurrentTag(newTag);
    const queryParams = new URLSearchParams(location.search);
    if (newTag) {
        queryParams.set('tag', newTag);
    } else {
        queryParams.delete('tag');
    }
    queryParams.set('page', 1); // 태그 변경 시 첫 페이지로
    if (currentFilter && currentFilter !== 'latest') {
        queryParams.set('filter', currentFilter);
    } else {
        queryParams.delete('filter');
    }
    navigate(`/board?${queryParams.toString()}`);
  };

  const handlePageChange = (pageNumber) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', pageNumber);
    navigate(`/board?${queryParams.toString()}`);
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 1) {
      pageButtons.push(
        <button key="prev" className="page-button" onClick={() => handlePageChange(currentPage - 1)}>
          &lt;
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`page-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pageButtons.push(
        <button key="next" className="page-button" onClick={() => handlePageChange(currentPage + 1)}>
          &gt;
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div>
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
            {posts.length === 0 && (currentFilter === 'latest' && !currentTag) ? (
                <p style={{textAlign: 'center', marginTop: '20px', fontSize: '1.1rem', color: '#666'}}>
                    아직 작성된 게시글이 없습니다. 첫 게시글을 작성해보세요!
                </p>
            ) : posts.length === 0 ? (
                <p style={{textAlign: 'center', marginTop: '20px', fontSize: '1.1rem', color: '#666'}}>
                    현재 선택된 필터와 태그에 해당하는 게시글이 없습니다.
                </p>
            ) : (
                posts.map(post => (
                    <div className="post-item" key={post.id} style={{ marginBottom: '1rem', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
                      {post.image && (
                        <img src={`http://localhost:5000/uploads/${post.image}`} alt="게시글 이미지" style={{ width: '100px', height: '100px', objectFit: 'cover', float: 'left', marginRight: '1rem', borderRadius: '5px' }} />
                      )}
                      <div>
                        <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
                        <p className="text-muted" style={{ fontSize: '0.9rem', color: '#888' }}>
                          <img src="/images/calendar.svg" alt="calendar" style={{ verticalAlign: 'middle', marginRight: '5px', width: '16px', height: '16px' }} />
                          {new Date(post.date).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}
                        </p>
                        <p style={{ fontSize: '1rem', color: '#333' }}>{post.content.substring(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
                        <div style={{ clear: 'both' }}>
                          {post.tags && post.tags.map(tag => (
                            <span key={tag} className="sidebar-tag" style={{ marginRight: '5px', marginBottom: '5px' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>

          <div className="pagination">
            {renderPaginationButtons()}
          </div>
        </div>

        <BoardSidebar
          onFilterChange={handleFilterChange}
          onTagClick={handleTagClick}
          currentFilter={currentFilter}
          currentTag={currentTag}
        />
      </div>
    </div>
  );
};

export default BoardList;