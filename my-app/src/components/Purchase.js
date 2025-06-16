import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../styles/Purchase.css';
import Footer from './Footer';


const CLOTHING_SIZES = [
  { value: 'S', label: '90' },
  { value: 'M', label: '95' },
  { value: 'L', 'label': '100' },
  { value: 'XL', label: '105' },
  { value: 'XXL', label: '110' },
];

const HAT_SIZES = [
  { value: '56', label: '56' },
  { value: '58', label: '58' },
  { value: '60', label: '60' },
  { value: '62', label: '62' },
];

const Ticket_AREA = [
  {value: '1루구역', label: '1루구역'},
  {value: '3루구역', label: '3루구역'},
  {value: '포수구역', label: '포수구역'},
  {value: '외야구역', label: '외야구역'},
];

const getSizeDisplayLabel = (value, productCategory) => {
  let sizesToUse = [];
  if (productCategory === '모자') {
    sizesToUse = HAT_SIZES;
  } else if (productCategory === '티켓') {
    sizesToUse = Ticket_AREA;
  } else {
    sizesToUse = CLOTHING_SIZES;
  }
  const found = sizesToUse.find(size => size.value === value);
  return found ? found.label : value;
};


const FREE_SHIPPING_THRESHOLD = 70000;
const SHIPPING_COST = 3000; 


function Purchase() {
  const navigate = useNavigate();
  const location = useLocation();

  const [shippingInfo, setShippingInfo] = useState({
    receiverName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const [orderedProducts, setOrderedProducts] = useState([]);
  const [baseTotalPrice, setBaseTotalPrice] = useState(0); 
  const [shippingFee, setShippingFee] = useState(0); 
  const [finalPaymentAmount, setFinalPaymentAmount] = useState(0); 

  useEffect(() => {
    if (location.state && location.state.product) {
      const productData = location.state.product;
      const quantityData = location.state.quantity || 1;

      const priceNumeric = parseFloat(String(productData.price).replace(/[^0-9.]/g, ''));
      const calculatedBasePrice = priceNumeric * quantityData;

      setOrderedProducts([{
        ...productData,
        quantity: quantityData,
        linePrice: calculatedBasePrice,
      }]);
      setBaseTotalPrice(calculatedBasePrice); 
    } else {
      setOrderedProducts([]);
      setBaseTotalPrice(0);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const calculatedShippingFee = baseTotalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const calculatedFinalAmount = baseTotalPrice + calculatedShippingFee;

    setShippingFee(calculatedShippingFee);
    setFinalPaymentAmount(calculatedFinalAmount);
  }, [baseTotalPrice]);


  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = () => {
    if (orderedProducts.length === 0) {
      alert('주문할 상품이 없습니다.');
      return;
    }

    if (!shippingInfo.receiverName || !shippingInfo.address || !shippingInfo.email || !shippingInfo.phoneNumber) {
      alert('모든 배송지 정보를 입력해주세요.');
      return;
    }

    if (!selectedPaymentMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }

    alert(
      `주문이 성공적으로 접수되었습니다! \n\n` +
      `받는 사람: ${shippingInfo.receiverName}\n` +
      `주소: ${shippingInfo.address}\n` +
      `연락처: ${shippingInfo.phoneNumber}\n` +
      `이메일: ${shippingInfo.email}\n\n` +
      `결제 수단: ${selectedPaymentMethod}\n` +
      `총 결제 금액: ${finalPaymentAmount.toLocaleString()}원\n\n` + 
      `구매해주셔서 감사합니다!`
    );

    navigate('/');
  };

  return (
    <div>
      <div id="purchase-container">
        <h2>결제하기</h2>

        <div className="section-box">
          <h3>배송지 정보</h3>
          <div className="shipping-info-form">
            <div className="form-group">
              <label htmlFor="receiverName">받는 사람:</label>
              <input
                type="text"
                id="receiverName"
                name="receiverName"
                value={shippingInfo.receiverName}
                onChange={handleShippingInfoChange}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">주소:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
                placeholder="상세 주소를 입력하세요"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleShippingInfoChange}
                placeholder="예: example@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">휴대폰 번호:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={handleShippingInfoChange}
                placeholder="예: 010-1234-5678"
              />
            </div>
          </div>
        </div>

        <div className="section-box">
          <h3>주문 상품</h3>
          {orderedProducts.length > 0 ? (
            <ul className="ordered-products-list">
              {orderedProducts.map((product, index) => (
                <li key={index} className="ordered-product-item">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="ordered-product-image" style={{height:'150px', width:'150px'}}/>
                  )}
                  <div className="product-details">
                    <span className="product-name">
                      {product.name}
                      {product.selectedSize && ` (${getSizeDisplayLabel(product.selectedSize, product.category)})`}<br />
                    </span>
                    <span className="product-qty">{product.quantity}개</span><br />
                    <span className="product-price">{product.linePrice.toLocaleString()}원</span>
                  </div>
                </li>
              ))}
              <li className="order-summary-total">
                <span>총 상품 금액:</span>
                <span className="total-price">{finalPaymentAmount.toLocaleString()}원</span>
              </li>
              <li className="order-summary-shipping">
                <span>배송비:</span>
                <span className="shipping-fee">
                  {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
                </span>
              </li>
              {baseTotalPrice < FREE_SHIPPING_THRESHOLD && (
                <li className="shipping-info-message">
                  ({(FREE_SHIPPING_THRESHOLD - baseTotalPrice).toLocaleString()}원 추가 구매 시 무료 배송)
                </li>
              )}
            </ul>
          ) : (
            <p className="no-products">주문할 상품이 없습니다.</p>
          )}
        </div>

        <div className="section-box">
          <h3>결제 수단</h3>
          <div className="payment-options">
            <div className="payment-method">
              <input
                type="radio"
                id="credit-card"
                name="paymentMethod"
                value="신용카드"
                checked={selectedPaymentMethod === '신용카드'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label htmlFor="credit-card">신용카드</label>
            </div>
            <div className="payment-method">
              <input
                type="radio"
                id="bank-transfer"
                name="paymentMethod"
                value="무통장입금"
                checked={selectedPaymentMethod === '무통장입금'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label htmlFor="bank-transfer">무통장입금</label>
            </div>
            <div className="payment-method">
              <input
                type="radio"
                id="mobile-pay"
                name="paymentMethod"
                value="휴대폰결제"
                checked={selectedPaymentMethod === '휴대폰결제'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label htmlFor="mobile-pay">휴대폰결제</label>
            </div>
          </div>
          <p className="total-amount-display">
            최종 결제 금액: <strong>{finalPaymentAmount.toLocaleString()}원</strong>
          </p>
        </div>


        <button onClick={handlePaymentSubmit} className="submit-payment-button">
          결제 완료하기
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Purchase;