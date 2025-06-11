
import React from 'react';
import '../styles/MiniCartModal.css'; 

const FREE_SHIPPING_THRESHOLD = 70000; 
const SHIPPING_COST = 3000; 

function MiniCartModal({ product, quantity, totalPrice, selectedSizeLabel, onClose, onGoToCart, onGoToPurchase }) {
  if (!product) {
    return null; 
  }

  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalPaymentAmount = totalPrice + shippingFee;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="mini-cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>장바구니에 상품이 담겼습니다!</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="mini-cart-item">
            {product.image && (
              <img src={product.image} alt={product.name} className="item-image" />
            )}
            <div className="item-details">
              <p className="item-name">
                {product.name}
                {selectedSizeLabel && ` (${selectedSizeLabel})`}
              </p>
              <p className="item-price-qty">{product.price} / {quantity}개</p>
            </div>
          </div>
          <div className="mini-cart-summary">
            <p>총 상품 금액: <strong>{totalPrice.toLocaleString()}원</strong></p>

            <p>
              배송비:
              <strong><span style={{color:'darkgray'}}>
                {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</span>
              </strong>
            </p>
            {totalPrice < FREE_SHIPPING_THRESHOLD && ( 
              <p className="shipping-info-message">
                ({(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString()}원 추가 구매 시 무료 배송)
              </p>
            )}

            <p className="final-total">총 결제 예정 금액: <strong>{finalPaymentAmount.toLocaleString()}원</strong></p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="continue-shopping-button" onClick={onClose}>계속 쇼핑하기</button>
          <button className="buy-now-button" onClick={onGoToPurchase}>바로 구매하기</button>
        </div>
      </div>
    </div>
  );
}

export default MiniCartModal;