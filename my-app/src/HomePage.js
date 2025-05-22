import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // .env에 저장된 API 키 사용

function HomePage() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const addComment = () => {
    if (comment.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    setComments([...comments, { text: comment, good: 0 }]);
    setComment('');
  };

  // 좋아요 수 증가
  const increaseGood = (index) => {
    const updated = comments.map((c, i) =>
      i === index ? { ...c, good: c.good + 1 } : c
    );
    setComments(updated);
  };

  // 홈으로 새로고침
  const goHome = () => {
    window.location.href = '/'; 
  };

  // 퀴즈 페이지로 이동
  const goToQuiz = () => {
    navigate('/one');
  };

  // YouTube API로 영상 가져오기
  useEffect(() => {
    const fetchYoutubeHighlights = async () => {
      if (!API_KEY) {
        setError("YouTube API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.");
        setLoading(false);
        return;
      }

      const targetChannelId = "UC8JtQf77wqhVpOQ8Cze8JjA"; // 티빙 스포츠 채널
      const searchQuery = "하이라이트 KBO";
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const maxResults = 5;
      const part = "snippet";

      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${targetChannelId}&q=${encodedSearchQuery}&part=${part}&type=video&order=date&maxResults=${maxResults}`;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`YouTube API 오류: ${errorData.error?.message || response.status}`);
        }

        const data = await response.json();
        setVideos(data.items || []);
      } catch (err) {
        console.error("YouTube API 호출 중 오류 발생:", err);
        setError(err.message);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchYoutubeHighlights();
  }, []);

  return (
    <div>
      {/* Header */}
      <div id="header">
        <div id="hd">
          <img
            src="bluecap.jpeg"
            height="75px"
            width="100"
            alt="bluecap"
            onClick={goHome}
            style={{ cursor: 'pointer' }}
          />
          <ul id="navigation">
            <li onClick={() => navigate('/board')}>Board</li>
            <li onClick={goToQuiz}>Who is my favorite player?</li>
            <li>game date</li>
            <li onClick={() => navigate('/Login')}>Sign In</li>
          </ul>
        </div>
      </div>
      
      <div className="body1">
        <h1>Today's Highlight</h1>
      </div>

      <div id="body2">
        {loading && <p>영상을 불러오는 중입니다...</p>}
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}

        {!loading && !error && videos.length > 0 && (
          <div style={{ marginBottom: '20px', padding: '10px' }}>
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${videos[0].id.videoId}`}
              title={videos[0].snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <p>표시할 영상이 없습니다. 검색 결과가 없거나 채널 ID 또는 API 키를 확인해주세요.</p>
        )}
      </div>

      <br /><br />
      <div className="border"></div>

      <div className="commentSection">
        <h3>Leave a Comment</h3>

        <div className="commentList">
          {comments.map((c, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{c.text}</p>
              <div
                onClick={() => increaseGood(index)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              >
                👍 {c.good}
              </div>
            </div>
          ))}
        </div>

        <textarea
          id="commentInput"
          placeholder="댓글을 달아주세요!"
          rows="4"
          cols="50"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button id="buttonStyle" onClick={addComment}>등록</button>
      </div>
    </div>
  );
}

export default HomePage;
