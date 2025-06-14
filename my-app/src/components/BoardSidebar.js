// BoardSidebar.js

import React from 'react';
import '../styles/Board.css';

const BoardSidebar = ({ onFilterChange, onTagClick, currentFilter, currentTag }) => {
  const tagsList = ['경기', '선수', '감독', '시구', '직관 일기'];

  return (
    <div className="board-sidebar">
      <div className="sidebar-section">
        <h4>필터</h4>
        <p
          className={currentFilter === 'latest' ? 'filter-active' : ''}
          onClick={() => onFilterChange('latest')}
          style={{ cursor: 'pointer' }}
        >
          최신순
        </p>
        {/* '좋아요 많은 순' 필터 제거 */}
        {/* <p
          className={currentFilter === 'likes' ? 'filter-active' : ''}
          onClick={() => onFilterChange('likes')}
          style={{ cursor: 'pointer' }}
        >
          좋아요 많은 순
        </p> */}
        <p
          className={currentFilter === 'comments' ? 'filter-active' : ''}
          onClick={() => onFilterChange('comments')}
          style={{ cursor: 'pointer' }}
        >
          댓글 많은 순
        </p>
      </div>
      <div className="sidebar-section">
        <h4>태그</h4>
        <div>
          {tagsList.map(tag => (
            <span
              key={tag}
              className={`sidebar-tag ${currentTag === tag ? 'tag-active' : ''}`}
              onClick={() => onTagClick(tag)}
              style={{ cursor: 'pointer' }}
            >
              {tag}
            </span>
          ))}
          {currentTag && (
              <span
                  className="sidebar-tag"
                  onClick={() => onTagClick('')} // 태그 초기화 (모두 보기)
                  style={{ cursor: 'pointer', backgroundColor: '#e0e0e0', marginLeft: '5px' }}
              >
                  모두 보기
              </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardSidebar;