import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

import { FaHome, FaCalendarAlt } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';
import { CiTextAlignCenter } from 'react-icons/ci';
import { FaShoppingBag } from 'react-icons/fa';

/* NavBar 추가 방법
    import '../styles/Board.css'; 상단에 추가 후
    콘텐츠 <div className="">로 감싸주고 <NavBar /> 추가
    CSS로 콘텐츠 ."" 안에 padding-top: 80px; 넣기
*/

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div id="header">
          <div className="nav-left">
        <img
          src="/images/Eagleslogo.png"
          height="75px"
          alt="HanhwaEgleas"
          onClick={() => navigate ('/WelcomePage')}
        />
        <p id="blueCapLogo"
          onClick={() => navigate ('/WelcomePage')}
          style={{ cursor: 'pointer' }}
          >
          blueCap
        </p>
        </div>

        <ul id="navigation" className="nav-center">
          <li className="HomeMenu">홈</li>
          <li onClick={() => navigate('/News')}>뉴스/하이라이트</li>
          <li onClick={() => navigate('/Board')}>게시판</li>
          
          <li className='page-button'> 
            <ul className='SubMenu'>
              <li onClick={() => navigate('/home')}>홈</li>
              <li onClick={() => window.open('https://www.hanwhaeagles.co.kr/index.do', '_blank')}>한화이글스 공식 홈페이지</li>
              <li onClick={() => window.open('https://www.koreabaseball.com/', '_blank')}>KBO 경기일정</li>
              <li onClick={() => navigate('/Status')}>선수 Status</li>
              <li onClick={() => navigate('/One')}>나의 최애 선수는?</li>
            </ul>팬페이지<img src="/images/fanpageico.svg"/></li>

          <li onClick={() => navigate('/Shop')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaShoppingBag style={{marginRight: '6px', verticalAlign: 'middle' }} />장터</li>
          </ul>

          <div id="login" className="nav-right" onClick={() => navigate('Login')}>
            로그인 / 회원가입 <FaSignInAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            </div>
      </div>
    </div>

  );
}

export default NavBar;
