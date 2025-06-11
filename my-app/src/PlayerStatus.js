import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Tabs, Tab, ListGroup, Card } from 'react-bootstrap';
import NavBar from './components/NavBar';
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

const PlayerDetailStats = ({ player, type }) => {
  const pitcherStats = [
    { label: '승', value: player.wins }, { label: '패', value: player.losses },
    { label: '세이브', value: player.saves }, { label: '탈삼진', value: player.strikeouts },
    { label: '평균자책점', value: player.era },
  ];
  const batterStats = [
    { label: '타점', value: player.rbi }, { label: '홈런', value: player.homeruns },
    { label: '안타', value: player.hits }, { label: '타율', value: player.avg },
    { label: '도루', value: player.stolen_bases },
  ];
  const statsToDisplay = type === 'pitchers' ? pitcherStats : batterStats;

  return (
    <ListGroup variant="flush" className="mt-3">
      {statsToDisplay.map(stat => (
        <ListGroup.Item key={stat.label} className="d-flex justify-content-between px-1 bg-transparent">
          <strong>{stat.label}</strong>
          <span>{stat.value !== undefined ? stat.value : '-'}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

const PlayerComparisonCard = ({ player, type, getImageUrl, isReversed = false }) => {
  const Photo = (
    <Col xs={5} className="d-flex flex-column align-items-center justify-content-center">
      <Image
        src={getImageUrl(player.name)}
        alt={player.name}
        onError={(e) => { e.target.onerror = null; e.target.src="/images/player/big/default_big.png"; }}
        fluid
        style={{ maxHeight: '150px', objectFit: 'contain' }}
      />
    </Col>
  );
  const Stats = (
    <Col xs={7}>
      <PlayerDetailStats player={player} type={type} />
    </Col>
  );

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column p-2">
        <Card.Title className="text-center mb-2 h6">{player.name}</Card.Title>
        <Row className="flex-grow-1 align-items-center g-0">
          {isReversed ? [Stats, Photo] : [Photo, Stats]}
        </Row>
      </Card.Body>
    </Card>
  );
};

const ComparisonView = ({ players, type, getImageUrl, onClose }) => (
    <Card className="h-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
            <strong>선수 비교</strong>
            <Button variant="close" onClick={onClose} aria-label="Close" />
        </Card.Header>
        <Card.Body className="p-2">
            <Row className="g-2 h-100">
                {players.map((player, index) => (
                    <Col key={player.name} md={players.length === 2 ? 6 : 12} className="d-flex flex-column">
                        <PlayerComparisonCard 
                            player={player} 
                            type={type}
                            getImageUrl={getImageUrl}
                            isReversed={index === 1} 
                        />
                    </Col>
                ))}
            </Row>
        </Card.Body>
    </Card>
);

function PlayerStatus() {
  const [allPlayers, setAllPlayers] = useState({ pitchers: [], batters: [] });
  const [selectedType, setSelectedType] = useState('pitchers');
  const [comparisonPlayers, setComparisonPlayers] = useState([]);
  const [topStrikeoutPlayer, setTopStrikeoutPlayer] = useState(null);
  const [topRbiPlayer, setTopRbiPlayer] = useState(null);
  const [topHomerunPlayer, setTopHomerunPlayer] = useState(null);

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
      })
      .catch(error => console.error("Error fetching player data:", error));
  }, []);
  
  const getPlayerThumbImage = (playerName) => `/images/player/thumb/${playerName}_thumb.jpg`;
  const getPlayerBigImage = (playerName) => `/images/player/big/${playerName}_big.png`;

  const handlePlayerSelect = (player) => {
    setComparisonPlayers(prev => {
      const isAlreadySelected = prev.some(p => p.name === player.name);
      if (isAlreadySelected) {
        return prev.filter(p => p.name !== player.name);
      } else {
        const newSelection = [player, ...prev];
        return newSelection.slice(0, 2);
      }
    });
  };
  
  const isPlayerSelected = (player) => comparisonPlayers.some(p => p.name === player.name);

  const displayedPlayers = selectedType === 'pitchers' ? allPlayers.pitchers : allPlayers.batters;

  return (
    <div>
      <NavBar />
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