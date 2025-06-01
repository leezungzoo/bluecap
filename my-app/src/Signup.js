import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaSignInAlt } from 'react-icons/fa';
import './Login.css'; // 스타일 유지

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (newPassword !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }
    alert(`회원가입 성공!\nID: ${newUsername}`);
    // 회원가입 처리 후 이동할 경우: navigate('/login');
  };

  return (
    <div>
      {/* Header */}
      <div id="header">
        <img
          src="/images/Eagleslogo.png"
          height="75px"
          width="100"
          alt="HanhwaEagles"
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
