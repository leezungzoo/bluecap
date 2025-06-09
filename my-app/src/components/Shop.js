import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ShopSidebar from './ShopSidebar';
import NavBar from './NavBar';
import { products } from './products';

const icons = {
  '전체상품': 'images/icons/uniform.png',
  '유니폼': 'images/icons/uniform.png',
  '의류/모자': 'images/icons/recycle-uniform.png',
  '굿즈(로고볼, 가방)': 'images/icons/signball.png',
  '굿즈(인형, 잡화)': 'images/icons/doll.png',
  '티켓': 'images/icons/ticket.png',
};


function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [priceFilter, setPriceFilter] = useState(null); // 가격 필터 추가

  const productsPerPage = 6;
  const navigate = useNavigate();

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
      <NavBar />
      <h2 className='market-title'>한화장터 매물</h2>

      <div className="market-grid">
        {[
          ['전체상품', '38개 매물'],
          ['유니폼', '38개 매물'],
          ['의류/모자', '38개 매물'],
          ['굿즈(로고볼, 가방)', '38개 매물'],
          ['굿즈(인형, 잡화)', '38개 매물'],
          ['티켓', '38개 매물'],
        ].map(([label, sub], idx) => (
          <div
            className={`market-item ${selectedCategory === label ? 'active' : ''}`}
            key={idx}
            onClick={() => {
              if (label === '전체상품') {
                setSelectedCategory(null);
              } else {
                setSelectedCategory(prev => (prev === label ? null : label));
              }
              setCurrentPage(1);
            }}
            style={{ cursor: 'pointer' }}
          >
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
            <ShopSidebar priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
          </Col>
        </Row>
      </Container>

      <footer className="text-left mt-4">
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
