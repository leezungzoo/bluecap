// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const Quiz = () => {
    navigate('/one'); // OnePage로 이동

  };

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
                <li>topics</li>
                <li onClick={Quiz}>Who is my favorite player?</li>
                <li>game date</li>
            </ul>
            </div>
      </div>
      <div id="body1">
        <h1>Today's Highlight</h1>
    </div>

    <div id="body2">
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
