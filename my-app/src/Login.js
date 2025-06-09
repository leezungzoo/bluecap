import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaShoppingBag, FaSignInAlt } from 'react-icons/fa';
import NavBar from './components/NavBar';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
      navigate('/Home');
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <NavBar />
      <div className="welcomepage-container"></div>

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
        <p>
          Blue represents our youth, and Cap signifies being at the heart of that youth.
          <img
            src="/images/Github.png"
            alt="GitHub"
            height="50px"
            width="50px"
            style={{ marginLeft: '20px', cursor: 'pointer' }}
            onClick={() => window.open('https://github.com/leezungzoo/bluecap')}
          />
        </p>
      </footer>
    </div>
  );
}

export default Login;
