import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaShoppingBag, FaHome, FaCalendarAlt } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: '응원 유니폼',
    description: '한화 이글스 공식 유니폼',
    price: '₩49,000',
    image: '/images/uniform.jpg',
  },
  {
    id: 2,
    name: '이글스 모자',
    description: '로고가 박힌 한화 모자',
    price: '₩25,000',
    image: '/images/cap.jpg',
  },
  {
    id: 3,
    name: '머플러',
    description: '겨울에도 따뜻하게!',
    price: '₩15,000',
    image: '/images/scarf.jpg',
  },
];

function Shop() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header Navigation */}
      <div id="header">
        <img
          src="/images/Eagleslogo.png"
          height="75px"
          width="100"
          alt="HanhwaEgleas"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        <h3 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          blue cap
        </h3>

        <ul id="navigation">
          <li className="HomeMenu">HOME
            <ul className="SubMenu">
              <li onClick={() => navigate('/home')}>HOME</li>
              <li onClick={() => window.open('https://www.hanwhaeagles.co.kr/index.do', '_blank')}>Eagles HomePage</li>
              <li onClick={() => window.open('https://www.koreabaseball.com/', '_blank')}>KBO 경기일정</li>
              <li onClick={() => navigate('/Status')}>선수 Status</li>
              <li onClick={() => navigate('/One')}>나의 최애 선수는?</li>
            </ul>
          </li>
          <li onClick={() => navigate('/News')}>News/Today's Highlights</li>
          <li onClick={() => navigate('/Board')}>BOARD</li>
          <li onClick={() => navigate('/Topics')}>PAGE</li>
          <li onClick={() => navigate('/shop')}>
            <FaShoppingBag style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            SHOP
          </li>
          <li onClick={() => navigate('/login')}>
            <FaSignInAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Login/Signin
          </li>
        </ul>
      </div>

      {/* Main Shop Page */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">매물</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '250px', objectFit: 'cover' }}
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
      </Container>

      {/* Footer */}
      <footer>
      <p>&copy; Websoftware : BLUECAP</p>
      <p>Blue represents our youth, and Cap signifies being at the heart of that youth.  <img src="/images/Github.png" height='50px' width='50px' style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => window.open('https://github.com/leezungzoo/bluecap')}></img></p>
      </footer>
    </div>
  );
}

export default Shop;
