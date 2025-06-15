import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import NavBar from './components/NavBar';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); 

      if (response.ok) { 
        if (data.success) {
          onLogin();
          navigate('/Home');
        } else {
          setLoginError(data.message || '로그인 실패: 알 수 없는 오류');
          alert(data.message || '아이디 또는 비밀번호가 잘못되었습니다.');
        }
      } else {
        setLoginError(data.message || '서버 오류가 발생했습니다.');
        alert(data.message || '서버 오류가 발생했습니다.');
      }

    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setLoginError('서버에 연결할 수 없거나 알 수 없는 오류가 발생했습니다.');
      alert('서버에 연결할 수 없거나 알 수 없는 오류가 발생했습니다.');
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
          {loginError && <p className="error-message">{loginError}</p>}
          <input
            type="text"
            placeholder="ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PW"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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