import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

import NavBar from './NavBar';

const icons = {
  '전체상품': 'images/icons/uniform.png',
  '유니폼': 'images/icons/uniform.png',
  '의류/모자': 'images/icons/recycle-uniform.png',
  '굿즈(로고볼, 가방)': 'images/icons/signball.png',
  '굿즈(인형, 잡화)': 'images/icons/doll.png',
  '티켓': 'images/icons/ticket.png',
};

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/data/board.json') // board에서 가져옴
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
    <NavBar />
    <div className="home-container">
      {/* 하이라이트 배너 */}
      <div className="highlight-banner">
        <div className="highlight-text">
          <p className="sub">지금 뜨는</p>
          <h2>하이라이트</h2>
          <p className="desc">오늘의 한화 경기 하이라이트와 베스트 콘텐츠</p>
          <button>보러가기</button>
        </div>
      </div>

      {/* 지금 뜨는 한화 뉴스 */}
      <section className="section">
        <div className="section-header">
        <h3 classname="title">지금 뜨는 한화 뉴스</h3>
        <Link to="/news" className="more-button">게시판 가기</Link>
        </div>
        <div className="news-grid">
          {Array(6).fill(0).map((_, idx) => (
            <div className="news-item" key={idx}>
              <img src="/images/highlights.png" alt="news" width="410px" height="292px"/>
              <p className="title">[한화 Vs LG] 5/27 경기 2025 신한 SOL뱅크 KBO 리그 | 하이라이트 | TVING</p>
              <p className="info">4시간 전 · 156 Students</p>
            </div>
          ))}
        </div>
      </section>

      {/* 인기 게시글 */}
      <section className="section">
        <div className="section-header">
        <h3 classname="title">인기 게시글</h3>
        <Link to="/board" className="more-button">게시판 가기</Link>
        </div>
        <div className="board-grid">
          {posts.slice(0, 3).map(post => (
            <Link to={`/post/${post.id}`} key={post.id} className="board-item">
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

      {/* 장터 매물 */}
      <section className="section">
        <div className="section-header">
        <h3 classname="title">한화 장터 매물</h3>
        <Link to="/shop" className="more-button">장터 가기</Link>
        </div>
        <div className="market-grid">
          {[
          ['유니폼'],
          ['의류/모자'],
          ['굿즈(로고볼, 가방)'],
          ['굿즈(인형, 잡화)'],
          ['티켓',],
          ].map(([label, sub], idx) => (
            <div className="market-item" key={idx}>
              <div className="icon-box"><img src={icons[label]} alt={label} className="icon-img" /></div>
              <p className="label">{label}</p>
              <p className="sub">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}

export default Home;
