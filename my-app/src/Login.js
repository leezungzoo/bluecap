import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaShoppingBag, FaSignInAlt } from 'react-icons/fa';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
      navigate('/HomePage');
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      {/* Header */}
      <div id="header">
        <img
          src="/images/Eagleslogo.png"
          height="75px"
          width="100"
          alt="HanhwaEgleas"
          onClick={() => navigate ('/')}
        />
        <h3
          onClick={() => navigate ('/')}
          style={{ cursor: 'pointer' }}
        >
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
          <li onClick={() => navigate('/Shop')}>
            <FaShoppingBag style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            SHOP
          </li>
          <li onClick={() => navigate('/Login')}>
            <FaSignInAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Login/Signin
          </li>
        </ul>
      </div>

      {/* 로그인 폼 */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="PW"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">로그인</button>

          <button
            type="button"
            className="signup-btn"
            onClick={handleSignupClick}
          >
            아이디가 없으신가요?
          </button>
        </form>
      </div>
          <footer>
          <p>&copy; Websoftware : BLUECAP</p>
          <p>Blue represents our youth, and Cap signifies being at the heart of that youth.  <img src="/images/Github.png" height='50px' width='50px' style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => window.open('https://github.com/leezungzoo/bluecap')}></img> </p>
          </footer>
    </div>
  );
}

export default Login;
