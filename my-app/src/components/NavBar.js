import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

import { FaHome, FaCalendarAlt } from 'react-icons/fa';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { CiTextAlignCenter } from 'react-icons/ci';
import { FaShoppingBag } from 'react-icons/fa';

/* NavBar 추가 방법
    import NavBar from './NavBar'; 상단에 임포트 후
    콘텐츠 <div className="">로 감싸주고 <NavBar /> 추가
    CSS로 콘텐츠 ."" 안에 padding-top: 80px; 넣기
*/

function NavBar({ isLoggedIn, user, onLogout}) {
  const navigate = useNavigate(); 

  const handleLogoutClick = () => {
    onLogout();
    navigate('/home');
  }

  return (
    <div>
      {/* Header */}
      <div id="header">
          <div className="nav-left">
        <img
          src="/images/Eagleslogo.png"
          height="75px"
          alt="HanhwaEgleas"
          onClick={() => navigate ('/')}
        />
        <p id="blueCapLogo"
          onClick={() => navigate ('/')}
          style={{ cursor: 'pointer' }}
          >
          blueCap
        </p>
        </div>

        <ul id="navigation" className="nav-center">
          <li onClick={() => navigate('/home')}>홈</li>
          <li onClick={() => navigate('/News')}>뉴스/하이라이트</li>
          <li onClick={() => navigate('/board')}>게시판</li>
          
          <li className='page-button'> 
            <ul className='SubMenu'>
              <li onClick={() => window.open('https://www.hanwhaeagles.co.kr/index.do', '_blank')}>한화이글스 공식 홈페이지</li>
              <li onClick={() => window.open('https://www.koreabaseball.com/', '_blank')}>KBO 경기일정</li>
              <li onClick={() => navigate('/Status')}>선수 Status</li>
              <li onClick={() => navigate('/One')}>나의 최애 선수는?</li>
            </ul>팬페이지<img src="/images/fanpageico.svg"/></li>

          <li onClick={() => navigate('/Shop')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaShoppingBag style={{marginRight: '6px', verticalAlign: 'middle' }} />장터</li>
          </ul>

          <div id="login" className="nav-right">
          {isLoggedIn ? (
            <>
              <span className="welcome-message"> {user.name}님 환영합니다</span>
              <div onClick={handleLogoutClick} className="logout-button">
                로그아웃 <FaSignOutAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              </div>
            </>
          ) : (
            <div onClick={() => navigate('/Login')} className='login-button'>
              로그인 / 회원가입 <FaSignInAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default NavBar;
