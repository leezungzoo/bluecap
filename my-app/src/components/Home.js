import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/data/board.json') // board에서 가져옴
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
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
        <h3>지금 뜨는 한화 뉴스</h3>
        <div className="news-grid">
          {Array(6).fill(0).map((_, idx) => (
            <div className="news-item" key={idx}>
              <img src="/images/highlights.png" alt="news" />
              <p className="title">[한화 Vs LG] 5/27 경기 2025 신한 SOL뱅크 KBO 리그 | 하이라이트 | TVING</p>
              <p className="info">4시간 전 · 156 Students</p>
            </div>
          ))}
        </div>
      </section>

      {/* 인기 게시글 */}
      <section className="section">
        <h3>인기 게시글</h3>
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
        <Link to="/board" className="more-button">게시판 가기</Link>
      </section>

      {/* 장터 매물 */}
      <section className="section">
        <h3>한화 장터 매물</h3>
        <div className="market-grid">
          {[
            ['티켓', '38개 매물'],
            ['미개봉 유니폼', '38개 매물'],
            ['중고 유니폼', '38개 매물'],
            ['굿즈(카드, 사인볼)', '38개 매물'],
            ['굿즈(인형, 팔찌)', '38개 매물']
          ].map(([label, sub], idx) => (
            <div className="market-item" key={idx}>
              <div className="icon-box" />
              <p className="label">{label}</p>
              <p className="sub">{sub}</p>
            </div>
          ))}
        </div>
        <Link to="/market" className="more-button">장터 가기</Link>
      </section>
    </div>
  );
}

export default Home;
