import React, { useState, useEffect } from 'react'; // useEffect 임포트 추가
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 임포트
import { FaSearch } from 'react-icons/fa';
import ShopSidebar from './ShopSidebar';
import { products } from './products'; // products 데이터는 여기에 있다고 가정
import Footer from './Footer';
import '../styles/Footer.css';


const icons = {
  '전체상품': 'images/icons/all.png',
  '유니폼/의류': 'images/icons/uniform.png',
  '모자': 'images/icons/cap.png',
  '굿즈(로고볼, 가방)': 'images/icons/signball.png',
  '굿즈(인형, 잡화)': 'images/icons/doll.png',
  '티켓': 'images/icons/ticket.png',
};


function Shop() {
  const location = useLocation(); // useLocation 훅 사용
  // Home.js에서 전달된 initialCategory 상태를 초기값으로 가져오거나, 없으면 null (전체상품)
  const initialCategoryFromHome = location.state?.initialCategory || null;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // selectedCategory의 초기 상태를 Home.js에서 받은 값으로 설정합니다.
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryFromHome);
  const [priceFilter, setPriceFilter] = useState(null);

  const productsPerPage = 6;
  const navigate = useNavigate();

  // selectedCategory가 변경될 때마다 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const parsePrice = (priceStr) => {
    const numeric = priceStr.replace(/[₩,]/g, '').trim();
    if (numeric === '' || isNaN(numeric)) return 0;
    return parseInt(numeric, 10);
  };

  const filteredProducts = products.filter((product) => {
    const price = parsePrice(product.price);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    // 카테고리 필터링: selectedCategory가 null이면 모든 카테고리 일치,
    // 아니면 product.category가 selectedCategory와 정확히 일치해야 합니다.
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    let matchesPrice = true;
    if (priceFilter === 'high') matchesPrice = price >= 100000;
    else if (priceFilter === 'mid') matchesPrice = price > 0 && price < 100000;
    else if (priceFilter === 'free') matchesPrice = price === 0;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <h2 className='market-text'>한화장터 매물</h2>

      <div className="market-grid">
        {[
          // 각 레이블에 해당하는 실제 카테고리 값을 명시적으로 정의합니다.
          // '전체상품'의 경우 카테고리 필터가 null이 되도록 합니다.
          ['전체상품', null],
          ['유니폼/의류', '유니폼/의류'],
          ['모자', '모자'],
          ['굿즈(로고볼, 가방)', '굿즈(로고볼, 가방)'],
          ['굿즈(인형, 잡화)', '굿즈(인형, 잡화)'],
          ['티켓', '티켓'],
        ].map(([label, categoryValue], idx) => ( // 이제 label과 categoryValue를 모두 구조 분해 할당
          <div
            // selectedCategory와 해당 항목의 실제 categoryValue를 비교하여 'active' 클래스를 적용합니다.
            className={`market-item ${selectedCategory === categoryValue ? 'active' : ''}`}
            key={idx}
            onClick={() => {
              // 토글 로직: 현재 categoryValue가 이미 선택된 상태라면 null로 (모든 상품) 설정하고,
              // 그렇지 않으면 새 categoryValue로 설정합니다.
              setSelectedCategory(prev => (prev === categoryValue ? null : categoryValue));
              setCurrentPage(1); // 카테고리 변경 시 항상 1페이지로 리셋
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-box">
              <img src={icons[label]} alt={label} className="icon-img" />
            </div>
            <p className="label">{label}</p>
            {/* Shop.js의 market-grid 맵핑에서는 'sub' 값이 정의되지 않았으므로 이 부분은 삭제하거나 필요시 정의해야 합니다. */}
            {/* <p className="sub">{sub}</p> */}
          </div>
        ))}
      </div>

      <Container fluid className="mt-4">
        <Row>
          <Col md={10}>
            <div id='products'><h2>상품</h2></div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div id="searching" className="ms-auto">
                <form onSubmit={handleSearch} className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <FaSearch />
                  </button>
                </form>
              </div>
            </div>

            <Row className='products'>
              {currentProducts.map((product) => (
                <Col key={product.id} md={4} className="mb-4">
                  <div className='object-products' onClick={() => navigate('/cart', { state: { product } })}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: '350px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text className="text-muted">{product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="pagination text-center mt-4">
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  className={`page-button mx-1 ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </Col>

          <Col md={2}>
            <ShopSidebar priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
          </Col>
        </Row>
      </Container>

     <Footer />
    </div>
  );
}

export default Shop;