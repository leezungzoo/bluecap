import React from 'react';
import { Link } from 'react-router-dom';
import BoardSidebar from './BoardSidebar';
import NavBar from './NavBar';
import '../styles/Board.css';

const BoardList = () => {
  const posts = [
    { id: 1, title: '제발 김경문은 현구장에 두고 가자', date: '2025.05.28', content: '대한야구협회의 마지막 감독이...', image: '/sample.jpg' },
    { id: 2, title: '한화이글스 최다 탈삼진 투구 기록한 선수 2명 보유한 팀돼요', date: '2025.05.28', content: '본문 시작. kbo 정규시즌 최다 탈삼진 투수...', image: null },
    // 현재 더미데이터로 삽입해놓음
  ];

  return (
    <div>
      <NavBar />
    <div className="board-container">
      <div className="board-main">
        <Link className="board-title" to={`/board`}>게시판</Link>
        <Link to="/write" className="post-button">글쓰기</Link>

        <div className="post-list">
          {posts.slice(1).map(post => (
            <div className="post-item" key={post.id}>
              <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
              <p className="text-muted"><img src="/images/calendar.svg" alt="calendar"/>  {post.date}</p>
              <p>{post.content}</p>
            </div>
          ))}

          {posts.slice(1).map(post => (
            <div className="post-item" key={post.id}>
              <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
              <p className="text-muted"><img src="/images/calendar.svg" alt="calendar"/>  {post.date}</p>
              <p>{post.content}</p>
            </div>
          ))}

          {posts.slice(1).map(post => (
            <div className="post-item" key={post.id}>
              <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
              <p className="text-muted"><img src="/images/calendar.svg" alt="calendar"/>  {post.date}</p>
              <p>{post.content}</p>
            </div>
          ))}

          {posts.slice(1).map(post => (
            <div className="post-item" key={post.id}>
              <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
              <p className="text-muted"><img src="/images/calendar.svg" alt="calendar"/>  {post.date}</p>
              <p>{post.content}</p>
            </div>
          ))}

          {posts.slice(1).map(post => (
            <div className="post-item" key={post.id}>
              <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
              <p className="text-muted"><img src="/images/calendar.svg" alt="calendar"/>  {post.date}</p>
              <p>{post.content}</p>
            </div>
          ))}

          {posts.slice(1).map(post => (
            <div className="post-item" key={post.id}>
              <Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>
              <p className="text-muted"><img src="/images/calendar.svg" alt="calendar"/>  {post.date}</p>
              <p>{post.content}</p>
            </div>
          ))}

        </div>

        <div className="pagination">
          <button className="page-button active">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
        </div>
      </div>

      <BoardSidebar />
    </div>
    </div>
  );
};

export default BoardList;