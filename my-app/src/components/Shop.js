import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ShopSidebar from './ShopSidebar';
import NavBar from './NavBar';

const icons = {
  '미개봉 유니폼': 'images/icons/uniform.png',
  '의류/모자': 'images/icons/recycle-uniform.png',
  '굿즈(로고볼, 가방)': 'images/icons/signball.png',
  '굿즈(인형, 잡화)': 'images/icons/doll.png',
  '티켓': 'images/icons/ticket.png',
};

const products = [
  { id: 1, name: '응원 유니폼', description: '한화 이글스 홈 유니폼(오렌지)', price: '₩143,000', image: '/images/uniform.jpg' },
  { id: 2, name: '응원유니폼', description: '한화이글스 홈 유니폼(화이트)', price: '₩143,000', image: '/images/uniform-white.jpg' },
  { id: 3, name: '응원유니폼', description: '한화이글스 원정 유니폼(네이비)', price: '₩143,000', image: '/images/uniform-navy.jpg' },
  { id: 4, name: '반팔티셔츠', description: '한화이글스 반팔티셔츠(오렌지)', price: '₩59,000', image: '/images/shirt-orange.jpg' },
  { id: 5, name: '반팔티셔츠', description: '한화이글스 반팔티셔츠(화이트)', price: '₩59,000', image: '/images/shirt-white.jpg' },
  { id: 6, name: '모자', description: '한화이글스 볼캡(오렌지)', price: '₩49,000', image: '/images/cap-orange.jpg' },
  { id: 7, name: '모자', description: '한화이글스 볼캡(화이트)', price: '₩49,000', image: '/images/cap-white.jpg' },
  { id: 8, name: '이글스 짐쌕', description: '한화이글스 짐썍', price: '₩39,000', image: '/images/jimsack.jpg' },
  { id: 9, name: '이글스 짐쌕', description: '한화이글스 짐썍', price: '₩39,000', image: '/images/jimsack-navy.jpg' },
  { id: 10, name: '이글스 보스턴 백', description: '한화이글스 보스턴 백', price: '₩59,000', image: '/images/bostonbag.jpg' },
  { id: 11, name: '수리키링', description: '수리 미니 가방키링', price: '₩18,000', image: '/images/sooridoll.jpg' },
  { id: 12, name: '한화이글스 X 꿈돌이 인형', description: '한화이글스 X 꿈돌이 인형', price: '₩39,000', image: '/images/ggoomdori.jpg' },
  { id: 13, name: '한화이글스 후디 인형', description: '한화이글스 후디 인형', price: '₩25,000', image: '/images/hoodidoll.jpg' },
  { id: 14, name: '한화이글스 응원배트', description: '한화이글스 응원 배트', price: '₩10,000', image: '/images/bat.jpg' },
  { id: 15, name: '한화이글스 타월', description: '한화이글스 타월', price: '₩25,000', image: '/images/towel.jpg' },
  { id: 16, name: '한화이글스 엠블럼 타월', description: '한화이글스 엠블럼 타월 25', price: '₩25,000', image: '/images/towel2.jpg' },
  { id: 17, name: '수리 머리띠', description: '한화이글스 수리 머리띠', price: '₩19,000', image: '/images/soorithi.jpg' },
  { id: 18, name: '로고 머리띠', description: '한화이글스 로고 머리띠', price: '₩19,000', image: '/images/logothi.jpg' },
  { id: 19, name: '이글스 로고 볼', description: '한화이글스 로고 볼(오렌지)', price: '₩6,500', image: '/images/logoball-orange.jpg' },
  { id: 20, name: '로고 볼(네이비)', description: '한화이글스 로고 볼(네이비)', price: '₩6,500', image: '/images/logoball.jpg' },
  { id: 21, name: '이글스 빅 볼', description: '한화이글스 빅 볼', price: '₩45,000', image: '/images/bigball.jpg' },
  { id: 22, name: '티켓', description: '한화이글스 홈 구장 티켓 양도', price: '구간별 상이', image: '/images/ticket.png' },
  
  
];

function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <NavBar />

      <h2 className='market-title'>한화장터 매물</h2>

      <div className="market-grid">
        {[
          ['미개봉 유니폼', '38개 매물'],
          ['의류/모자', '38개 매물'],
          ['굿즈(로고볼, 가방)', '38개 매물'],
          ['굿즈(인형, 잡화)', '38개 매물'],
          ['티켓', '38개 매물'],
        ].map(([label, sub], idx) => (
          <div className="market-item" key={idx}>
            <div className="icon-box">
              <img src={icons[label]} alt={label} className="icon-img" />
            </div>
            <p className="label">{label}</p>
            <p className="sub">{sub}</p>
          </div>
        ))}
      </div>

      <Container fluid className="mt-4">
        <Row>
          <Col md={10}>
            <h2>All Courses</h2>

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
                      <Button variant="warning">구매하기</Button>
                    </Card.Body>
                  </Card>
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
            <ShopSidebar />
          </Col>
        </Row>
      </Container>

      <footer className="text-center mt-4">
        <p>&copy; Websoftware : BLUECAP</p>
        <p>
          Blue represents our youth, and Cap signifies being at the heart of that youth.
          <img
            src="/images/Github.png"
            height="50px"
            width="50px"
            style={{ marginLeft: '20px', cursor: 'pointer' }}
            onClick={() => window.open('https://github.com/leezungzoo/bluecap')}
            alt="GitHub"
          />
        </p>
      </footer>
    </div>
  );
}

export default Shop;
