import React from 'react';
import '../styles/Board.css';
import '../styles/Home.css';

const ShopSidebar = ({ priceFilter, setPriceFilter }) => {
  const handleCheck = (value) => {
    setPriceFilter(prev => (prev === value ? null : value));
  };

  return (
    <div className="board-sidebar">
      <div className="sidebar-section">
        <h4>가격</h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="price1"
            checked={priceFilter === 'high'}
            onChange={() => handleCheck('high')}
          />
          <label className="form-check-label" htmlFor="price1">
            10만원 이상
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="price2"
            checked={priceFilter === 'mid'}
            onChange={() => handleCheck('mid')}
          />
          <label className="form-check-label" htmlFor="price2">
            1-10만원
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="price3"
            checked={priceFilter === 'free'}
            onChange={() => handleCheck('free')}
          />
          <label className="form-check-label" htmlFor="price3">
            무료 나눔
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
