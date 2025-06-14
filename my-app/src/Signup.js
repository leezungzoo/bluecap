import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaSignInAlt } from 'react-icons/fa';
import './Login.css'; // 스타일 유지
import NavBar from './components/NavBar';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (newPassword !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          username: newUsername,
          password: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // "회원가입 성공"
        navigate('/login');  // 성공 시 로그인 페이지로 이동
      } else {
        alert(data.message); // "이미 사용중인 아이디..." 등 서버 에러 메시지
      }

      } catch (error) {
          console.error('회원가입 요청 실패:', error);
          alert('서버와 통신할 수 없습니다.');
      }
  };

  return (
    <div>
      <NavBar />
      <div classname="welcomepage-container"></div>

      {/* Signup Form */}
      <div className="login-container">
        <form onSubmit={handleSignup} className="login-form">
          <h2>회원가입</h2>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="새 아이디"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button type="submit" className="login-btn">가입하기</button>
        </form>
      </div>

      <footer>
        <p>&copy; Websoftware : BLUECAP</p>
        <p>Blue represents our youth, and Cap signifies being at the heart of that youth.
        <img src="/images/Github.png" height='50px' width='50px' style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => window.open('https://github.com/leezungzoo/bluecap')}></img> </p>
      </footer>
    </div>
  );
}

export default Signup;
