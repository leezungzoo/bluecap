// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { FaHome, FaCalendarAlt } from 'react-icons/fa';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div id="header">
        <img
          src="/images/Eagleslogo.png"
          height="75px"
          width="100"
          alt="HanhwaEgleas"
          onClick={() => window.location.reload()}
        />
        <h3
          onClick={() => window.location.reload()}
          style={{ cursor: 'pointer' }}
          >
          blue cap
        </h3>

        <ul id="navigation">
          <li onClick={() => navigate('/home')}>홈</li>
          <li onClick={() => navigate('/News')}>뉴스/하이라이트</li>
          <li onClick={() => navigate('/Board')}>게시판</li>
          <li onClick={() => navigate('Topics')}>페이지</li>
          <li onClick={() => navigate('/Shop')}>장터</li>
          <li onClick={() => navigate('Login')}>로그인/회원가입</li>
        </ul>
      </div>

      <div id="body">
        <img src="bluecap.jpeg" alt="bluecap" style={{height: '500px', width: '100%'}} />

        <div id="body-text">
        <h1>Welcome! Eagles Fan!</h1> <br />
        <p>
        <span style={{ color: '#e56f1f', fontWeight: 'bold' }}>BlueCap</span>
        은 한국 프로 야구(KBO) 구단 한화 이글스의 팬 페이지입니다. <br />
        한화 이글스 경기에 대한 뉴스와 하이라이트를 모아 볼 수 있으며, 팬 회원 전용 게시판과 장터를 이용할 수 있습니다. <br />
        한화생명 이글스 파크 위치와 날씨 정보, 선수 스테이터스, 최애 선수 찾기 퀴즈처럼 팬 콘텐츠를 제공합니다. <br />
        </p>


        <div style={{ marginLeft:'250px' }}>
        <img src="/images/Hanhwalogo.png" alt="eagleslogo" style={{height: '250px', width: '250px'}} /> <br />
        </div>

        <p>
          <span style={{ color: '#e56f1f', fontWeight: 'bold' }}>한화 이글스</span>는 충청권을 연고로 1985년 한국 프로 야구(KBO)의 제7구단으로 출범했습니다. <br />
          대전광역시 중구 부사동에 위치한 대전 한화생명볼파크를 홈 구장으로 이용하고 있으며, 제2구장은 충청북도 청주시 서원구 사직동에 위치한 청주야구장입니다
        </p> <br /><br />
        <p>
          보다 많은 분들이 야구를 관람하며 행복을 느낄 수 있도록 한화이글스는 투혼을 담은 경기를 위해 최선을 다하고 있습니다. <br />
          내부 육성 시스템을 정비하고 중장기 계획을 바탕으로 모두가 함께 노력하고 있습니다.
        </p> <br /><br />
        <p>
          늘 응원해주시는 팬들의 성원과 기대에 부응할 수 있도록, 역동적인 경기와 다양한 마케팅을 전개해 팬과 함께 비상하는 구단이 되겠습니다.
        </p> <br />

        <div className='button-row'>
        <button onClick={() => window.open('https://www.hanwhaeagles.co.kr/index.do', '_blank')} className="home-button">
          <FaHome />
          한화이글스 구단 홈페이지로 이동
        </button>

        <button onClick={() => window.open('https://www.koreabaseball.com/Schedule/Schedule.aspx', '_blank')} className='home-button'>
           <FaCalendarAlt />
          경기일정 바로가기
        </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
