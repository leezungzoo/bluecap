import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../styles/Cart.css';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/Footer.css'; // Footer 스타일 임포트

// --- 새로 추가될 모달 컴포넌트 임포트 (아래에서 구현할 예정) ---
import MiniCartModal from './MiniCartModal';
// -------------------------------------------------------------

const CLOTHING_SIZES = [
  { value: 'S', label: '90' },
  { value: 'M', label: '95' },
  { value: 'L', label: '100' },
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


function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [showSizeSelection, setShowSizeSelection] = useState(true);

  // --- 새로 추가: 미니 장바구니 모달 상태 ---
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  // ------------------------------------------

  const handleBuyClick = () => {
    if (!product) {
      alert('구매할 상품이 없습니다.');
      return;
    }
    if (showSizeSelection && !selectedSize) {
        alert('사이즈 또는 구역을 선택해주세요.');
        return;
    }

    navigate('/purchase', {
      state: {
        product: {
          ...product,
          selectedSize: selectedSize
        },
        quantity: quantity
      }
    });
  };

  // --- handleBasketClick 수정: 모달 열기 ---
  const handleBasketClick = () => {
    if (!product) {
      alert('장바구니에 담을 상품이 없습니다.');
      return;
    }
    // 여기에 상품을 실제 장바구니 상태에 추가하는 로직이 들어갈 수 있습니다.
    // 현재는 단일 상품만 다루므로, 간단히 알림 후 모달을 엽니다.
    alert(`${product.name} ${quantity}개가 장바구니에 담겼습니다!`);
    setIsMiniCartOpen(true); // 모달 열기
  };
  // ----------------------------------------

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    const isGoodsProduct = product && (product.category === '굿즈(로고볼, 가방)' || product.category === '굿즈(인형, 잡화)');
    if (isGoodsProduct) {
      setShowButtons(true);
    } else if (selectedSize !== '') {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [selectedSize, product]);


  useEffect(() => {
    if (product && (product.category === '굿즈(로고볼, 가방)' || product.category === '굿즈(인형, 잡화)')) {
      setShowSizeSelection(false);
    } else {
      setShowSizeSelection(true);
    }
  }, [product]);


  useEffect(() => {
    if (product && product.price) {
      const cleanedPriceString = String(product.price).replace(/[^0-9.]/g, '');
      const numericPrice = parseFloat(cleanedPriceString);

      if (!isNaN(numericPrice)) {
        setTotalPrice(numericPrice * quantity);
      } else {
        setTotalPrice(0);
        console.warn("Product price could not be parsed to a number:", product.price);
      }
    } else {
      setTotalPrice(0);
    }
  }, [quantity, product]);


  let currentSizeOptions = CLOTHING_SIZES;
  if (product && product.category === '모자') {
    currentSizeOptions = HAT_SIZES;
  } else if (product && product.category === '티켓') {
    currentSizeOptions = Ticket_AREA;
  }


  return (
    <div>
      <NavBar />

      <div id='basket'>
        {product ? (
          <div>
            <div id='product-object'>
              <img src={product.image} alt={product.name} style={{ width: '650px' }} />

              <div id='product-description'>
                <p>{product.name}</p>
                <p>{product.price}</p>

                <div style={{ margin: '20px 0' }}>
                  <div id='body-text'>
                    <p>배송비</p>
                    <div>
                      <p>3,000원 (70,000원 이상 구매 시 무료)</p>
                    </div>
                  </div>

                  {showSizeSelection && (
                    <div id='body-text'>
                      <p>Size </p>
                      <div>
                        <label htmlFor="size-select"></label>
                        <select
                          id="size-select"
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="size-select"
                        >
                          <option value="">(필수) 선택하세요</option>

                          {currentSizeOptions.map((size) => (
                            <option key={size.value} value={size.value}>
                              {size.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div id='find-button' className={showButtons ? 'visible' : 'hidden'} >
                  <div style={{ alignItems: 'center', gap: '10px' }}>

                <div id='f-b'>
                    {showSizeSelection && selectedSize ? (
                      <div id='sS'>{getSizeDisplayLabel(selectedSize, product.category)}<br /><br /></div>
                    ) : (
                      <div id='sS'></div>
                    )} </div>

                    <div style={{ display: 'center', alignItems: 'center', gap: '10px' }}>
                      <button onClick={decreaseQuantity} className="quantity-button">-</button>
                      <span>{quantity}</span>
                      <button onClick={increaseQuantity} className="quantity-button">+</button>
                    </div>
                    <br />
                    <h4 style={{ fontSize: '17px' }}>총 구매금액: {totalPrice.toLocaleString()}원 <span style={{ fontSize: '12px' }}>({quantity}개)</span></h4>
                  </div>
                  <br />

                  <div className='babu'>
                    <button onClick={handleBasketClick} className="basket-button">장바구니</button>
                    <button onClick={handleBuyClick} className="buy-button">구매하기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="empty-message">장바구니가 비어 있습니다.</p>
        )}
      </div>
      <Footer />

      {/* --- 새로 추가: 미니 장바구니 모달 렌더링 --- */}
      {isMiniCartOpen && product && ( // 모달이 열려 있고 상품 정보가 있을 때만 렌더링
        <MiniCartModal
          product={product}
          quantity={quantity}
          totalPrice={totalPrice}
          selectedSizeLabel={getSizeDisplayLabel(selectedSize, product.category)}
          onClose={() => setIsMiniCartOpen(false)} // 닫기 버튼 콜백
          onGoToCart={() => { // "장바구니로 이동" 버튼 콜백 (선택 사항)
            setIsMiniCartOpen(false);
            navigate('/cart-details'); // 상세 장바구니 페이지로 이동 (별도 페이지 필요)
          }}
          onGoToPurchase={() => { // "바로 구매" 버튼 콜백
            setIsMiniCartOpen(false);
            handleBuyClick(); // 기존 구매 로직 호출
          }}
        />
      )}
      {/* ------------------------------------------------ */}
    </div>
  );
}

export default Cart;