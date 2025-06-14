import React from 'react';
import '../styles/Board.css';

const BoardSidebar = ({ onFilterChange, onTagClick, currentFilter, currentTag }) => {
  const tagsList = ['경기', '선수', '감독', '시구', '직관 일기'];

  return (
    <div className="board-sidebar">
      <div className="sidebar-section">
        <h4>필터</h4>
        <div className="filter-options">
          {/* 체크박스 필터 */}
          <label className="filter-item">
            <input
              type="checkbox"
              value="latest"
              checked={currentFilter === 'latest'}
              onChange={() => onFilterChange('latest')}
            />
            <span className="filter-text">최신 순</span>
          </label>
          <label className="filter-item">
            <input
              type="checkbox"
              value="comments" 
              checked={currentFilter === 'comments'}
              onChange={() => onFilterChange('comments')}
            />
            <span className="filter-text">댓글 순</span>
          </label>
        </div>
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