import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaShoppingBag } from 'react-icons/fa';

const SpotlightBox = ({ title, player, statValue, statUnit, getImageUrl }) => {
  return (
    <div 
      className="text-center p-3 border rounded h-100 d-flex flex-column" 
      style={{ minWidth: '240px' }}
    >
      <h4 className="mb-3">{title}</h4>
      {player ? (
        <>
          <Image 
            src={getImageUrl(player.name)} 
            alt={player.name}
            onError={(e) => { e.target.onerror = null; e.target.src="/images/player/big/default_big.png"; }}
            fluid 
            rounded 
            style={{ 
              maxHeight: '360px', 
              objectFit: 'contain', 
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            className="mx-auto"
          />
          <h5 style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '0.5rem'}}>{player.name}</h5>
          <p style={{fontSize: '1rem', marginTop: 'auto'}}>{statValue} {statUnit}</p>
        </>
      ) : <p className="mt-auto mb-auto">데이터 없음</p>}
    </div>
  );
};


function PlayerStatus() {
  const navigate = useNavigate();
  const [allPlayers, setAllPlayers] = useState({ pitchers: [], batters: [] });
  const [selectedType, setSelectedType] = useState('pitchers');
  const [displayedPlayers, setDisplayedPlayers] = useState([]);

  const [topStrikeoutPlayer, setTopStrikeoutPlayer] = useState(null);
  const [topRbiPlayer, setTopRbiPlayer] = useState(null);
  const [topHomerunPlayer, setTopHomerunPlayer] = useState(null);

  useEffect(() => {
    fetch('/player.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const parsePlayerStats = (playerArray, statsToParse) => {
          return playerArray.map(player => {
            const newPlayer = { ...player };
            statsToParse.forEach(stat => {
              if (newPlayer[stat] !== undefined && newPlayer[stat] !== null) {
                newPlayer[stat] = Number(newPlayer[stat]);
              } else {
                newPlayer[stat] = 0;
              }
            });
            return newPlayer;
          });
        };

        const pitchers = parsePlayerStats(data.pitchers || [], ['strikeouts', 'wins', 'saves', 'era']);
        const batters = parsePlayerStats(data.batters || [], ['rbi', 'homeruns', 'hits', 'avg', 'stolen_bases']);
        
        setAllPlayers({ pitchers, batters });

        if (pitchers.length > 0) {
          const sortedPitchersBySO = [...pitchers].sort((a, b) => b.strikeouts - a.strikeouts);
          setTopStrikeoutPlayer(sortedPitchersBySO[0]);
        }
        if (batters.length > 0) {
          const sortedBattersByRBI = [...batters].sort((a, b) => b.rbi - a.rbi);
          setTopRbiPlayer(sortedBattersByRBI[0]);
          const sortedBattersByHR = [...batters].sort((a, b) => b.homeruns - a.homeruns);
          setTopHomerunPlayer(sortedBattersByHR[0]);
        }
      })
      .catch(error => console.error("Error fetching or parsing player data:", error));
  }, []);

  useEffect(() => {
    if (selectedType === 'pitchers') {
      setDisplayedPlayers(allPlayers.pitchers);
    } else {
      setDisplayedPlayers(allPlayers.batters);
    }
  }, [selectedType, allPlayers]);

  const getPlayerThumbImage = (playerName) => `/images/player/thumb/${playerName}_thumb.jpg`;
  const getPlayerBigImage = (playerName) => `/images/player/big/${playerName}_big.png`;

  return (
    <div>
      <div id="header">
        <img
          src="/images/Eagleslogo.png"
          height="75px"
          width="100"
          alt="HanhwaEagles"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        <h3 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
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
          <li onClick={() => navigate('/shop')}>
            <FaShoppingBag style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            SHOP
          </li>
          <li onClick={() => navigate('/login')}>
            <FaSignInAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Login/Signin
          </li>
        </ul>
      </div>

      <Container fluid style={{ marginTop: '20px', marginBottom: '20px', padding: '0 30px' }}>
        <Row className="align-items-stretch">
          <Col md="auto">
            <div style={{ 
              width: '320px', 
              border: '1px solid #eee', 
              borderRadius: '8px',       
              padding: '15px',
              height: '75vh',
              overflowY: 'auto'  
            }}>
              <Tabs
                activeKey={selectedType}
                onSelect={(k) => setSelectedType(k)}
                className="mb-3"
                justify
              >
                <Tab eventKey="pitchers" title="투 수"></Tab>
                <Tab eventKey="batters" title="타 자"></Tab>
              </Tabs>
              
              <Row className="g-2">
                {displayedPlayers.length > 0 ? displayedPlayers.map(player => (
                  <Col key={player.name} xs={4} className="d-flex justify-content-center mb-2">
                    <div 
                      style={{
                        width: '90px',
                        height: '90px',
                        minWidth: '90px',
                        maxWidth: '90px',
                        borderRadius: '12px',
                        border: '1px solid #ddd',
                        overflow: 'hidden',
                        display: 'flex',
                        cursor: 'pointer'
                      }}
                      onClick={() => {/* 선수 클릭 시 동작 예정 */}}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') {/* 클릭 동작 */} }}
                    >
                      <Button 
                        variant="light"
                        className="p-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                        }}
                      >
                        <Image 
                          src={getPlayerThumbImage(player.name)} 
                          alt={player.name} 
                          onError={(e) => { e.target.onerror = null; e.target.src="/images/player/thumb/default_thumb.jpg"; }}
                          style={{ 
                            width: '60px', 
                            height: '60px',
                            objectFit: 'cover', 
                            borderRadius: '8px', 
                            marginBottom: '4px' 
                          }}
                        />
                        <span style={{ 
                            fontSize: '0.7rem', 
                            textAlign: 'center', 
                            color: '#333',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap'    
                          }}>
                          {player.name}
                        </span>
                      </Button>
                    </div>
                  </Col>
                )) : <Col><p>해당 유형의 선수가 없습니다.</p></Col>}
              </Row>
            </div>
          </Col>

          <Col 
            md 
            className="d-flex justify-content-center align-items-center"
          >
            <Row className="g-5 w-auto justify-content-center"> 
              <Col md="auto" sm={6} xs={12} className="mb-3 d-flex">
                <SpotlightBox 
                  title="탈삼진" 
                  player={topStrikeoutPlayer} 
                  statValue={topStrikeoutPlayer?.strikeouts} 
                  statUnit="K"
                  getImageUrl={getPlayerBigImage} 
                />
              </Col>
              <Col md="auto" sm={6} xs={12} className="mb-3 d-flex">
                <SpotlightBox 
                  title="최고 타점" 
                  player={topRbiPlayer} 
                  statValue={topRbiPlayer?.rbi} 
                  statUnit="점"
                  getImageUrl={getPlayerBigImage}
                />
              </Col>
              <Col md="auto" sm={6} xs={12} className="mb-3 d-flex">
                <SpotlightBox 
                  title="홈런왕" 
                  player={topHomerunPlayer} 
                  statValue={topHomerunPlayer?.homeruns} 
                  statUnit="개"
                  getImageUrl={getPlayerBigImage}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <footer>
        <p>&copy; Websoftware : BLUECAP</p>
        <p>Blue represents our youth, and Cap signifies being at the heart of that youth.  <img src="/images/Github.png" height='50px' width='50px' style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => window.open('https://github.com/leezungzoo/bluecap')}></img></p>
      </footer>
    </div>
  );
}

export default PlayerStatus;