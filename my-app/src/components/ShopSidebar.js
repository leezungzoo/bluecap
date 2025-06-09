import React from 'react';
import '../styles/Board.css';
import '../styles/Home.css';

const ShopSidebar = () => {
  return (
    <div className="board-sidebar">
      {/* 가격 필터 체크박스 섹션 */}
      <div className="sidebar-section">
        <h4>가격</h4>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="price1" />
          <label className="form-check-label" htmlFor="price1">
            10만원 이상
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="price2" />
          <label className="form-check-label" htmlFor="price2">
            1-10만원
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="price3" />
          <label className="form-check-label" htmlFor="price3">
            무료 나눔
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
