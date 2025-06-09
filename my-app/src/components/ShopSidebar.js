import React from 'react';
import '../styles/Board.css';
import '../styles/Home.css';

const ShopSidebar = () => {
  return (
    <div className="board-sidebar">
      <div className="sidebar-section">
        <h4>필터</h4>
        <p>최신순<br />좋아요 많은 순<br />댓글 많은 순</p>
      </div>
      <div className="sidebar-section">
        <h4>태그</h4>
        <div>
          <span className="sidebar-tag">경기</span>
          <span className="sidebar-tag">선수</span>
          <span className="sidebar-tag">감독</span>
          <span className="sidebar-tag">시구</span>
          <span className="sidebar-tag">직관 일기</span>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
