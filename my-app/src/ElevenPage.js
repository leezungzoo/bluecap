import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Page.css';
import Footer from './components/Footer';
import './styles/Footer.css';

function ElevenPage() {
  const location = useLocation();
  const yesCount = location.state?.yesCount || 0;
  const navigate = useNavigate();

  // 홈으로 새로고침
  const goHome = () => {
    window.location.href = '/';
  };

  // 퀴즈 페이지로 이동
  const goToQuiz = () => {
    navigate('/one');
  };

  // 선수 이미지를 클릭했을 때 PlayerStatus 페이지로 이동하는 함수
  const goToPlayerStatus = (playerName) => {
    navigate('/Status', { state: { selectedPlayerName: playerName } });
  };

  return (
    <div>
      <div className="welcomepage-container"></div>
      <div className="container">
        <div className="player">
          <h5>당신과 어울리는 선수는: </h5>

          <div className="object">
            {yesCount === 10 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>노시환</h3>
                  <img
                    src="images/player/big/노시환_big.png"
                    alt="노시환"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('노시환')} // '노시환' (player.json 이름과 일치)
                  />
                </div>
                <p>당신은 실용적이고, 이성적인 판단을 중요시 하며, 결정력이 있는 '4번타자'입니다. 필요할 때 마다 한번씩 해결하여 팀에 가장 필요한 당신과 가장 어울리는 타자는 '노시환'입니다</p>
              </>
            )}

            {yesCount === 9 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>문현빈</h3>
                  <img
                    src="images/player/big/문현빈_big.png"
                    alt="문현빈"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('문현빈')} // '문현빈' (player.json 이름과 일치)
                  />
                </div>
                <p>당신은 실용적일뿐 아니라 미래지향적인 결정력이 있는 당신은 '특급 유망주'입니다. 모든 분야에서 윤곽을 보이는 당신과 가장 어울리는 타자는 '문현빈'입니다</p>
              </>
            )}

            {yesCount === 8 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>채은성 입니다!</h3>
                  <img
                    src="images/player/big/채은성_big.png"
                    alt="채은성"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('채은성')} // '채은성' (player.json 이름과 일치)
                  />
                </div>
                <p>리더쉽이 있고 부드러운 성격으 소유자인 당신은 '캡틴'입니다. 부드러운 카리스마로 위 아래 많은 사람들이 따르는 당신과 가장 잘 어울리는 타자는 '채은성' 입니다 </p>
              </>
            )}

            {yesCount === 7 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>황영묵 입니다!</h3>
                  <img
                    src="images/player/big/황영묵_big.png"
                    alt="황영묵"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('황영묵')} // '황영묵' (player.json 이름과 일치)
                  />
                </div>
                <p>열정과 끈기가 남다른 당신은 열이 높아질수록 강해지는 '강철'입니다. 절대 포기할 줄 모르는 당신과 가장 잘 어울리는 타자는 '황영묵' 입니다. </p>
              </>
            )}

            {yesCount === 6 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>이진영 입니다!</h3>
                  <img
                    src="images/player/big/이진영_big.png"
                    alt="이진영"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('이진영')} // '이진영' (player.json 이름과 일치)
                  />
                </div>
                <p>매일 조금씩 성장하는 모습을 보이는 당신은 '진화인'입니다. 매일 조금씩이라도 지속해서 성장하는 당신과 잘 어울리는 타자는 '이진영' 입니다. </p>
              </>
            )}

            {yesCount === 5 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>플로리얼 입니다!</h3>
                  <img
                    src="images/player/big/플로리얼_big.png"
                    alt="플로리얼"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('플로리얼')} // '플로리얼' (player.json 이름과 일치)
                  />
                </div>
                <p>역동적이고 강한 한방이 있는 당신은 '공포의 용병'입니다. 뭐든 빠르고 강하게 해결하는 당신과 잘 어울리는 타자는 '플로리얼' 입니다.</p>
              </>
            )}
            {yesCount === 4 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>최재훈 입니다!</h3>
                  <img
                    src="images/player/big/최재훈_big.png"
                    alt="최재훈"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('최재훈')} // '최재훈' (player.json 이름과 일치)
                  />
                </div>
                <p>특별하진 않지만 항상 묵묵하게 자기 할 일을 완벽히 수행하는 당신은 '안방마님' 유형의 사람입니다. 자기 할 일을 묵묵히 해내는 당신과 어울리는 타자는 '최재훈' 입니다.</p>
              </>
            )}

            {yesCount === 3 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>최인호 입니다!</h3>
                  <img
                    src="images/player/big/최인호_big.png"
                    alt="최인호"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('최인호')} // '최인호' (player.json 이름과 일치)
                  />
                </div>
                <p>매력적인 외모와 흥미로움을 주는 눈을 가진 당신은 '호타준족' 유형의 사람입니다. 실력 뿐 아니라 외모도 중요하다고 생각하는 당신과 어울리는 타자는 '최인호' 입니다.</p>
              </>
            )}

            {yesCount === 2 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>심우준 입니다!</h3>
                  <img
                    src="images/player/big/심우준_big.png"
                    alt="심우준"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('심우준')} // '심우준' (player.json 이름과 일치)
                  />
                </div>
                <p>안정감이 있는 당신은 '진공청소기'입니다. 어떤 걱정거리가 있어도 다 쓸어담는 당신과 잘 어울리는 타자는 '심우준' 입니다.</p>
              </>
            )}

            {yesCount === 1 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>안치홍 입니다!</h3>
                  <img
                    src="images/player/big/안치홍_big.png"
                    alt="안치홍"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('안치홍')} // '안치홍' (player.json 이름과 일치)
                  />
                </div>
                <p>너무나도 순수한 마음을 갖고 있는 당신은 '카피바라'입니다. 항상 순수한 마음으로 모두에게 힘을 주는 당신과 잘 어울리는 타자는 '안치홍' 입니다. </p>
              </>
            )}

            {yesCount === 0 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
                  <h3>김태연 입니다!</h3>
                  <img
                    src="images/player/big/김태연_big.png"
                    alt="김태연"
                    style={{ width: '300px', height: '300px', borderRadius: '10%', cursor: 'pointer' }}
                    onClick={() => goToPlayerStatus('김태연')} // '김태연' (player.json 이름과 일치)
                  />
                </div>
                <p>익살스러운 장난끼로 항상 주위를 줄겁게 만드는 당신은 '플레이 메이커' 입니다. 아이스브레이킹의 장인인 당신과 잘 어울리는 타자는 '김태연' 입니다. </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='Footer-space-1'>
        <Footer />
      </div>
    </div>
  );
}

export default ElevenPage;