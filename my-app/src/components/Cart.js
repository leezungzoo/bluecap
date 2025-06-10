import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/Cart.css';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/Footer.css';

// Define your size options
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

// Helper to map selectedSize value to its display label (e.g., 'S' to '90', or '56' to '56')
const getSizeDisplayLabel = (value, productCategory) => {
  let sizesToUse = [];
  if (productCategory === '모자') { // Assuming '모자' is the category for hats
    sizesToUse = HAT_SIZES;
  } else { // Default to clothing sizes for other categories
    sizesToUse = CLOTHING_SIZES;
  }
  const found = sizesToUse.find(size => size.value === value);
  return found ? found.label : value; // Return label if found, otherwise the value itself
};


function Cart() {
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleBuyClick = () => {
    alert(`감사합니다 ${product.name} ${quantity}개가 구매 되었습니다!`);
  };

  const handleBasketClick = () => {
    alert(`${product.name} ${quantity}개가 장바구니에 담겼습니다!`);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const [selectedSize, setSelectedSize] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (selectedSize !== '') {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [selectedSize]);

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

  // Determine which set of sizes to use
  let currentSizeOptions = CLOTHING_SIZES;
  if (product && product.category === '의류/모자') { // Assuming '모자' is the category for hats
    currentSizeOptions = HAT_SIZES;
  }
  // You might need to refine 'product.category' based on your actual product data structure.
  // For example, if '모자' is part of '의류/모자', you might need to check 'product.name' or add a specific 'type' property to your product objects.


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
                        <option value="">(필수)사이즈를 선택하세요</option>
                        {/* Conditionally render options based on product category */}
                        {currentSizeOptions.map((size) => (
                          <option key={size.value} value={size.value}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div id='find-button' className={showButtons ? 'visible' : 'hidden'} >
                  <div style={{ alignItems: 'center', gap: '10px' }}>
                    {/* Display the correct label for the selected size */}
                    <div id='sS'>{selectedSize ? getSizeDisplayLabel(selectedSize, product.category) : ''}<br /><br /></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
    </div>
  );
}

export default Cart;