import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Tabs, Tab, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; // useLocation 임포트 추가
import './PlayerStatus.css';

const SpotlightBox = ({ title, player, statValue, statUnit, getImageUrl }) => (
    <div
      className="text-center p-3 border rounded h-100 d-flex flex-column"
      style={{ minWidth: '240px' }}
    >
      <h4 className="mb-3" style={{ fontSize: '1.5rem' }}>{title}</h4>
      {player ? (
        <>
          <Image
            src={getImageUrl(player.name)}
            alt={player.name}
            onError={(e) => { e.target.onerror = null; e.target.src="/images/player/big/default_big.png"; }}
            fluid
            rounded
            style={{
              maxHeight: '300px',
              objectFit: 'contain',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            className="mx-auto"
          />
          <h5 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginTop: 'auto' }}>{player.name}</h5>
          <p style={{ fontSize: '1.3rem' }}>{statValue} {statUnit}</p>
        </>
      ) : <p className="mt-auto mb-auto">데이터 없음</p>}
    </div>
);

const StatBarChart = ({ label, playerA, playerB, statKey }) => {
  const valueA = playerA?.[statKey] ?? 0;
  const valueB = playerB?.[statKey] ?? 0;
  const total = valueA + valueB;

  let percentA = 50;
  if (total > 0) {
    percentA = (valueA / total) * 100;
  } else {
    percentA = playerB ? 0 : 100;
  }

  return (
    <div className="stat-chart-row">
      <div className="stat-labels">
        <span style={{color: '#FC4E00'}}>{valueA}</span>
        <span>{label}</span>
        <span style={{color: '#07111F'}}>{valueB}</span>
      </div>
      <div className="bar-container">
        <div className="bar-segment playerA-bar" style={{ width: `${percentA}%` }}></div>
        <div className="bar-segment playerB-bar" style={{ width: `${100 - percentA}%` }}></div>
      </div>
    </div>
  );
};

const ComparisonView = ({ players, type, getImageUrl, onClose }) => {
  const playerA = players[0];
  const playerB = players[1];

  const pitcherStats = [
    { label: '승', key: 'wins' },
    { label: '세이브', key: 'saves' },
    { label: '탈삼진', key: 'strikeouts' },
    { label: '평균자책점', key: 'era' },
  ];
  const batterStats = [
    { label: '타점', key: 'rbi' },
    { label: '홈런', key: 'homeruns' },
    { label: '안타', key: 'hits' },
    { label: '타율', key: 'avg' },
    { label: '도루', key: 'stolen_bases' },
  ];
  const statsToShow = type === 'pitchers' ? pitcherStats : batterStats;

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>선수 비교</strong>
        <Button variant="close" onClick={onClose} aria-label="Close" />
      </Card.Header>
      <Card.Body>
        <Row className="h-100 align-items-center">
          <Col xs={3} className="text-center">
            {playerA && (
              <div className="spotlight-wrapper visible">
                <Image src={getImageUrl(playerA.name)} alt={playerA.name} fluid style={{maxHeight: '300px'}} />
                <h5 className="mt-2">{playerA.name}</h5>
              </div>
            )}
          </Col>

          <Col xs={6}>
            {statsToShow.map(stat => (
              <StatBarChart
                key={stat.key}
                label={stat.label}
                playerA={playerA}
                playerB={playerB}
                statKey={stat.key}
              />
            ))}
          </Col>

          <Col xs={3} className="text-center">
            {playerB ? (
              <div className="spotlight-wrapper visible">
                <Image src={getImageUrl(playerB.name)} alt={playerB.name} fluid style={{maxHeight: '300px'}} />
                <h5 className="mt-2">{playerB.name}</h5>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                비교할 선수를 선택하세요.
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

function PlayerStatus() {
  const [allPlayers, setAllPlayers] = useState({ pitchers: [], batters: [] });
  const [selectedType, setSelectedType] = useState('pitchers');
  const [comparisonPlayers, setComparisonPlayers] = useState([]);
  const [topStrikeoutPlayer, setTopStrikeoutPlayer] = useState(null);
  const [topRbiPlayer, setTopRbiPlayer] = useState(null);
  const [topHomerunPlayer, setTopHomerunPlayer] = useState(null);

  const location = useLocation(); // useLocation 훅 사용
  const { selectedPlayerName } = location.state || {}; // 전달받은 선수 이름

  useEffect(() => {
    fetch('/player.json')
      .then(response => response.json())
      .then(data => {
        const parse = (arr, stats) => arr.map(p => {
          const newP = { ...p };
          stats.forEach(s => { newP[s] = newP[s] != null ? Number(newP[s]) : 0; });
          return newP;
        });
        const pitchers = parse(data.pitchers || [], ['wins', 'losses', 'saves', 'strikeouts', 'era']);
        const batters = parse(data.batters || [], ['rbi', 'homeruns', 'hits', 'avg', 'stolen_bases']);
        setAllPlayers({ pitchers, batters });
        if (pitchers.length > 0) setTopStrikeoutPlayer([...pitchers].sort((a, b) => b.strikeouts - a.strikeouts)[0]);
        if (batters.length > 0) {
          setTopRbiPlayer([...batters].sort((a, b) => b.rbi - a.rbi)[0]);
          setTopHomerunPlayer([...batters].sort((a, b) => b.homeruns - a.homeruns)[0]);
        }

        // ElevenPage에서 선수 이름이 전달된 경우, 해당 선수를 자동으로 선택
        if (selectedPlayerName) {
            const foundPlayer = [...pitchers, ...batters].find(p => p.name === selectedPlayerName);
            if (foundPlayer) {
                // 선수가 투수인지 타자인지에 따라 탭을 변경
                if (pitchers.some(p => p.name === selectedPlayerName)) {
                    setSelectedType('pitchers');
                } else if (batters.some(p => p.name === selectedPlayerName)) {
                    setSelectedType('batters');
                }
                setComparisonPlayers([foundPlayer]); // 해당 선수를 비교 대상으로 자동 설정
            }
        }
      })
      .catch(error => console.error("Error fetching player data:", error));
  }, [selectedPlayerName]); // selectedPlayerName이 변경될 때마다 useEffect 재실행
  
  const getPlayerThumbImage = (playerName) => `/images/player/thumb/${playerName}_thumb.jpg`;
  const getPlayerBigImage = (playerName) => `/images/player/big/${playerName}_big.png`;

  const handlePlayerSelect = (player) => {
    setComparisonPlayers(prev => {
      const fixedPlayer = prev[0];
      const isAlreadySelected = prev.some(p => p.name === player.name);

      if (fixedPlayer && fixedPlayer.name === player.name) return [];
      if (isAlreadySelected) return prev.filter(p => p.name !== player.name);
      if (!fixedPlayer) return [player];
      return [fixedPlayer, player];
    });
  };
  
  const isPlayerSelected = (player) => comparisonPlayers.some(p => p.name === player.name);
  const displayedPlayers = selectedType === 'pitchers' ? allPlayers.pitchers : allPlayers.batters;

  return (
    <div style={{ marginTop: '100px' }}>
      <Container fluid style={{ marginTop: '20px', marginBottom: '20px', padding: '0 30px' }}>
        <Row className="align-items-stretch">
          <Col md="auto">
            <div style={{ width: '320px', border: '1px solid #eee', borderRadius: '8px', padding: '15px', height: '75vh', overflowY: 'auto' }}>
              <Tabs activeKey={selectedType} onSelect={(k) => { setSelectedType(k); setComparisonPlayers([]); }} className="mb-3" justify>
                <Tab eventKey="pitchers" title="투 수"></Tab>
                <Tab eventKey="batters" title="타 자"></Tab>
              </Tabs>
              <Row className="g-2">
                {displayedPlayers.map(player => (
                  <Col key={player.name} xs={4} className="d-flex justify-content-center mb-2">
                    <div
                      className={`player-button ${isPlayerSelected(player) ? 'selected' : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => handlePlayerSelect(player)}
                      onKeyPress={(e) => { if (e.key === 'Enter') handlePlayerSelect(player) }}
                      style={{ width: '90px', height: '90px', borderRadius: '12px', border: '1px solid #ddd', overflow: 'hidden', cursor: 'pointer' }}
                    >
                      <Button as="div" variant="light" className="p-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center" style={{ border: 'none', backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <Image src={getPlayerThumbImage(player.name)} alt={player.name} onError={(e) => { e.target.onerror = null; e.target.src="/images/player/thumb/default_thumb.jpg"; }} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginBottom: '4px' }} />
                        <span style={{ fontSize: '0.7rem', textAlign: 'center', color: '#333', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{player.name}</span>
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          <Col>
            {comparisonPlayers.length === 0 ? (
              <Row className="g-4 h-100 align-items-center">
                  <Col md={4} className="d-flex justify-content-center">
                    <div className={`spotlight-wrapper ${topStrikeoutPlayer ? 'visible' : ''}`}>
                      <SpotlightBox title="탈삼진" player={topStrikeoutPlayer} statValue={topStrikeoutPlayer?.strikeouts} statUnit="K" getImageUrl={getPlayerBigImage} />
                    </div>
                  </Col>
                  <Col md={4} className="d-flex justify-content-center">
                    <div className={`spotlight-wrapper ${topRbiPlayer ? 'visible' : ''}`}>
                      <SpotlightBox title="최고 타점" player={topRbiPlayer} statValue={topRbiPlayer?.rbi} statUnit="점" getImageUrl={getPlayerBigImage} />
                    </div>
                  </Col>
                  <Col md={4} className="d-flex justify-content-center">
                      <div className={`spotlight-wrapper ${topHomerunPlayer ? 'visible' : ''}`}>
                      <SpotlightBox title="홈런왕" player={topHomerunPlayer} statValue={topHomerunPlayer?.homeruns} statUnit="개" getImageUrl={getPlayerBigImage} />
                    </div>
                  </Col>
              </Row>
            ) : (
              <div className="comparison-view-animate w-100 h-100">
                  <ComparisonView
                    players={comparisonPlayers}
                    type={selectedType}
                    getImageUrl={getPlayerBigImage}
                    onClose={() => setComparisonPlayers([])}
                  />
              </div>
            )}
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