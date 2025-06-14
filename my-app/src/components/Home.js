import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Footer from './Footer';
import '../styles/Footer.css';
import NavBar from './NavBar';

const newsArticles = [
  {
    id: 1,
    title: '한화, 5월 폭주 미쳤다! 12041일 만의 12연승…',
    category: '엑스포츠뉴스',
    image: 'images/05-12.jpg',
    description: '(엑스포츠뉴스 고척, 조은혜 기자)선두 한화이글스가 키움 히어로즈와의 3연전을 모두 잡고 11연승에 이어 12연승까지 순식간에 도달했다.',
    date: '2025-05-11',
  },
  {
    id: 2,
    title: '한화 26년 만에 10연승 진짜 미쳤다!',
    category: '엑스포츠뉴스',
    image: 'images/05-09.jpg',
    description: '(엑스포츠뉴스 고척, 박정현 기자) 한화 이글스는 패배를 모른다. 9회초 2사 후 터진 문현빈의 극적인 솔로포에 힘입어 1999년 이후 26년 만에 10연승을 질주했다.',
    date: '2025-05-09',
  },
  {
    id: 3,
    title: '파죽의 승승승승승승승! 한화',
    category: '연합뉴스',
    image: 'images/05-05.jpg',
    description: '한화가 지는 법을 잊었다. 신구장 첫 어린이날 경기를 승리로 가져가며 파죽의 7연승을 질주했다. 김경문 감독이 이끄는 한화 이글스는 5일 대전 한화생명 볼파크에서 열린',
    date: '2025-05-05',
  },
];

const videoHighlights = [
  {
    id: 1,
    title: '2025년 6월 12일 한화 vs 두산 경기 하이라이트',
    category: '경기 하이라이트',
    thumbnail: 'images/videos/06-12.png',
    videoUrl: 'https://www.youtube.com/watch?v=_cdxbWI0zF8',
    date: '2025-06-12',
  },
  {
    id: 2,
    title: '2025년 6월 11일 한화 vs 두산 경기 하이라이트',
    category: '경기 하이라이트',
    thumbnail: 'images/videos/06-11.png',
    videoUrl: 'https://www.youtube.com/watch?v=YtO02vsrzS4',
    date: '2025-06-11',
  },
  {
    id: 3,
    title: '2025년 6월 10일 한화 vs 두산 경기 하이라이트',
    category: '경기 하이라이트',
    thumbnail: 'images/videos/06-10.png',
    videoUrl: 'https://www.youtube.com/watch?v=19CE18YvYNc',
    date: '2025-06-10',
  },
];

const icons = {
  '전체상품': 'images/icons/all.png',
  '유니폼/의류': 'images/icons/uniform.png',
  '모자': 'images/icons/cap.png',
  '굿즈(로고볼, 가방)': 'images/icons/signball.png',
  '굿즈(인형, 잡화)': 'images/icons/doll.png',
  '티켓': 'images/icons/ticket.png',
};

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/board.json')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const goToShopWithCategory = (categoryLabel) => {
    const shopCategoryMap = {
      '전체상품': null,
      '유니폼/의류': '유니폼/의류',
      '모자': '모자',
      '굿즈(로고볼, 가방)': '굿즈(로고볼, 가방)',
      '굿즈(인형, 잡화)': '굿즈(인형, 잡화)',
      '티켓': '티켓',
    };
    const targetCategory = shopCategoryMap[categoryLabel];
    navigate('/shop', { state: { initialCategory: targetCategory } });
  };

  return (
    <div>
      <NavBar />
      <div className="home-container">
        <section className="section bdy">
          <div className="section-header">
            <h3 className="title">경기 하이라이트</h3>
            <Link to="/news" state={{ activeTab: 'videos' }} className="more-button">하이라이트</Link>
          </div>
          <div className="news-grid">
            {videoHighlights.map((video) => (
              <div className="news-item item-card" key={video.id}>
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                  <img src={video.thumbnail} alt={video.title} width="410px" height="292px" />
                </a>
                <p className="title">{video.title}</p>
                <p className="info">{video.date} · {video.category}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h3 className="title">지금 뜨는 한화 뉴스</h3>
            <Link to="/news" className="more-button">게시판 가기</Link>
          </div>
          <div className="news-grid">
            {newsArticles.map((article) => (
              <div className="news-item item-card" key={article.id}>
                <img src={article.image} alt={article.title} width="410px" height="292px" />
                <p className="title">{article.title}</p>
                <p className="info">{article.date} · {article.category}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h3 className="title">인기 게시글</h3>
            <Link to="/board" className="more-button">게시판 가기</Link>
          </div>
          <div className="board-grid">
            {posts.slice(0, 3).map(post => (
              <Link to={`/post/${post.id}`} key={post.id} className="board-item item-card">
                <div className="image-box">{!post.image && <span>이미지 없음</span>}</div>
                <div className="text-box">
                  <strong className="title">{post.title}</strong>
                  <p className="meta">📅 {post.date}</p>
                  <p className="content">{post.content}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h3 className="title">한화 장터 매물</h3>
            <Link to="/shop" className="more-button">장터 가기</Link>
          </div>
          <div className="market-grid">
            {[
              ['전체상품'],
              ['유니폼/의류'],
              ['모자'],
              ['굿즈(로고볼, 가방)'],
              ['굿즈(인형, 잡화)'],
              ['티켓',],
            ].map(([label, sub], idx) => (
              <div
                className="market-item item-card"
                key={idx}
                onClick={() => goToShopWithCategory(label)}
              >
                <div className="icon-box"><img src={icons[label]} alt={label} className="icon-img" /></div>
                <p className="label">{label}</p>
                <p className="sub">{sub}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;