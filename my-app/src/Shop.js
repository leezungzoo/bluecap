import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaShoppingBag, FaHome, FaCalendarAlt } from 'react-icons/fa';
import NavBar from './components/NavBar';

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
       <NavBar />
        <div classname="welcomepage-container"></div>

        <h2>매물</h2> <br />

        <div id="category">
          <ul id = "category-list">
            <li id='category-card'>티켓 <br />
            <span id='subtext'>38개 매물</span>
            </li>
            <li id='category-card'>미개봉 유니폼 <br />
            <span id='subtext'>38개 매물</span>
            </li>
            <li id='category-card'>중고 유니폼 <br />
            <span id='subtext'>38개 매물</span>
            </li>
            <li id='category-card'>굿즈(카드, 사인볼)<br />
            <span id='subtext'>38개 매물</span>
            </li>
            <li id='category-card'>굿즈(인형, 잡화)<br />
            <span id='subtext'>38개 매물</span>
            </li>
          </ul>
        </div>


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

      <footer>
      <p>&copy; Websoftware : BLUECAP</p>
      <p>Blue represents our youth, and Cap signifies being at the heart of that youth.  <img src="/images/Github.png" height='50px' width='50px' style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => window.open('https://github.com/leezungzoo/bluecap')}></img></p>
      </footer>
    </div>
  );
}

export default Shop;