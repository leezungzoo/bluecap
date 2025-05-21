// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
//.env 파일에 API 키 관리

function HomePage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goHome = () => {
    navigate('/');
  };

  const Quiz = () => {
    navigate('/one'); // OnePage로 이동

  };

  useEffect(() => {
    const fetchYoutubeHighlights = async () => {
      if (!API_KEY) {
        setError("YouTube API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.");
        setLoading(false);
        return;
      }
      const targetChannelId = "UC8JtQf77wqhVpOQ8Cze8JjA"; //티빙 스포츠

      //console.log("설정된 targetChannelId:", targetChannelId); 

      if (!targetChannelId) {
        setError("대상 YouTube 채널 ID가 설정되지 않았습니다.");
        setLoading(false);
        return;
      }

      const searchQuery = "하이라이트 KBO";
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const maxResults = 5;
      const part = "snippet";
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${targetChannelId}&q=${encodedSearchQuery}&part=${part}&type=video&order=date&maxResults=${maxResults}`;

      console.log("Requesting API URL:", apiUrl);

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`YouTube API 오류: ${errorData.error.message || response.status}`);
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideos(data.items); // API 응답에서 items 배열을 videos 상태에 저장
        } else {
          setVideos([]); // 결과가 없을 시 빈 배열
        }
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
                <li onClick={Quiz}>Who is my favorite player?</li>
                <li>game date</li>
                <li onClick={() => navigate('/Login')}>Sign In</li>
            </ul>
            </div>
      </div>
      <div id="body1">
        <h1>Today's Highlight</h1>
    </div>

    <div id="body2">
        <h2>지정 채널 야구 하이라이트 (YouTube) - 최신 영상 1개</h2>
        {loading && <p>영상을 불러오는 중입니다...</p>}
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        
        {/* 영상이 있고, 로딩과 에러가 아닐 때 첫 번째 영상만 표시 */}
        {!loading && !error && videos.length > 0 && (
          <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
            <h4>{videos[0].snippet.title}</h4>
            <p>{new Date(videos[0].snippet.publishTime).toLocaleDateString()}</p>
            <iframe
              width="100%" 
              height="315" 
              src={`https://www.youtube.com/embed/${videos[0].id.videoId}`}
              title={videos[0].snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* 영상이 없고, 로딩과 에러가 아닐 때 메시지 표시 */}
        {!loading && !error && videos.length === 0 && (
          <p>표시할 영상이 없습니다. 검색 결과가 없거나 채널 ID 또는 API 키를 확인해주세요.</p>
        )}
      </div>

    <div id="commentSection">
        <h3>Leave a Comment</h3>
        <textarea id="commentInput" placeholder="Write your comment here..." rows="4" cols="50"></textarea>
        <button onclick="addComment()">Post Comment</button>
        <div id="commentList"></div>
    </div>

    </div>
    
  );
}

export default HomePage;
