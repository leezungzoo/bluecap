import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/Footer.css'; // Assuming Footer.css is still relevant for News page if Footer is used

// Dummy data for news and videos - replace with actual data fetching in a real application
const newsArticles = [
  {
    id: 1,
    title: '한화, 5월 폭주 미쳤다! 12041일 만의 12연승…',
    category: '엑스포츠뉴스',
    image: 'images/05-12.jpg',
    description: '(엑스포츠뉴스 고척, 조은혜 기자) 단독 선두 한화 이글스가 키움 히어로즈와의 3연전을 모두 잡고 11연승에 이어 12연승까지 순식간에 도달했다. 12연승으로 가는 길, 필요했던 투수는 단 두 명이었다.',
    date: '2025-05-11',
  },
  {
    id: 2,
    title: '한화 26년 만에 10연승 진짜 미쳤다!',
    category: '엑스포츠뉴스',
    image: 'images/05-09.jpg',
    description: '(엑스포츠뉴스 고척, 박정현 기자) 한화 이글스는 패배를 모른다. 9회초 2사 후 터진 문현빈의 극적인 솔로포에 힘입어 1999년 이후 26년 만에 10연승을 질주했다.',
    date: '2025-05-09',
  },
  {
    id: 3,
    title: '파죽의 승승승승승승승! 한화, 문현빈 속죄의 결승포+와이스 역투',
    category: '연합뉴스',
    image: 'images/05-05.jpg',
    description: '한화가 지는 법을 잊었다. 신구장 첫 어린이날 경기를 승리로 가져가며 파죽의 7연승을 질주했다. 김경문 감독이 이끄는 한화 이글스는 5일 대전 한화생명 볼파크에서 열린 2025 프로야구 KBO리그 홈 경기에서 박진만 감독의 삼성 라이온즈를 3-1로 격파했다.',
    date: '2025-05-05',
  },
  {
    id: 4,
    title: '‘삼진-뜬공-뜬공-뜬공 72억 FA, 7타수 연속 무안타…타율 9푼8리→2군행, 언제쯤 1군 기회 올까',
    category: 'OSEN',
    image: 'images/05-25.jpg',
    description: 
'[OSEN=한용섭 기자] 한화 이글스 안치홍이 퓨처스리그 교류전 경기에서 2경기 연속 침묵했다. 타격감이 좀처럼 올라오지 않는 듯 하다.안치홍은 24일 서산구장에서 열린 일본프로야구 소프트뱅크 3군과 교류전에 1번 지명타자로 선발 출장해 4타수 무안타를 기록했다. ',
    date: '2025-05-25',
  },
  {
    id: 5,
    title: '이걸 이기다니. 진짜 강팀이다',
    category: '스포츠조선',
    image: 'images/05-29.jpg',
    description: '[잠실=스포츠조선 권인하 기자]아쉽게 놓칠뻔 했던 승리를 베테랑의 한방으로 되찾았다. 예전의 허약한 한화 이글스가 아님을 1위 팀과의 대결에서 각인시켰다.',
    date: '2025-05-29',
  },
  {
    id: 6,
    title: '한화 트레이드설 실체 나왔다! "원하는 쪽 있었다',
    category: '연합뉴스',
    image: 'images/06-11.jpg',
    description: '한화 이글스 김경문 감독이 끊이지 않았던 트레이드 소문과 관련해 솔직한 발언을 전했다. 김 감독은 트레이드를 추진한 팀이 있었지만, 현재는 트레이드 논의가 중단됐다고 밝혔다. 밑지는 장사일 수밖에 없는 한화 상황이라 상대 쪽에서 요구하는 카드를 받아들이기 어려웠던 것으로 알려졌다. ',
    date: '2025-06-11',
  },
    {
    id: 7,
    title: '류현진 170억 드디어 공식발표, 근데 무려 8년을 도대체 왜? 한화가 보장했나',
    category: '중앙일보',
    image: 'images/2024-02-23.jpg',
    description: '코리안 몬스터 류현진(37)이 마침내 KBO 리그의 한화 이글스로 돌아오면서, 향후 한화의 행보에 관심이 쏠리고 있다.',
    date: '2024-02-23',
  },
      {
    id: 8,
    title: '한화 38년 최초 역사 가공할 외인에 개막 승률 8할 질주',
    category: 'OSEN',
    image: 'images/2024-04-05.jpg',
    description: '프로야구 한화의 돌풍이 무섭다. 창단 후 개막 10경기 최고 성적의 고공 비행을 하고 있다. 한화는 4일 대전 한화생명이글스파크에서 열린 2024 신한 SOL 뱅크 KBO 리그 롯데와 홈 경기에서 6 대 5로 이겼다. 3점 차 열세를 뒤집은 짜릿한 역전승이었다.',
    date: '2024-04-05',
  },
];

const videoHighlights = [
  {
    id: 1,
    title: '6월 12일 한화 vs 넥센 경기 하이라이트',
    category: '경기 하이라이트',
    thumbnail: 'images/videos/game_highlight1.jpg',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_1', // Replace with actual YouTube embed URL
    date: '2025-06-12',
  },
  {
    id: 2,
    title: '김태균 선수 커리어 TOP 10 플레이',
    category: '스페셜 영상',
    thumbnail: 'images/videos/kimtaekyun_top10.jpg',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_2', // Replace with actual YouTube embed URL
    date: '2025-06-10',
  },
  {
    id: 3,
    title: '이글스 신인 선수들, 스프링캠프 훈련',
    category: '팀 훈련',
    thumbnail: 'images/videos/rookie_training.jpg',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_3', // Replace with actual YouTube embed URL
    date: '2025-06-08',
  },
  {
    id: 4,
    title: '류현진 선수 복귀전 투구 하이라이트',
    category: '경기 하이라이트',
    thumbnail: 'images/videos/ryuhyunjin_return.jpg',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_4', // Replace with actual YouTube embed URL
    date: '2025-06-03',
  },
];


function News() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'videos'

  const itemsPerPage = 6; // Number of news articles or videos per page
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const filteredItems = (activeTab === 'news' ? newsArticles : videoHighlights).filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const categories = [
    '전체보기',
    ...(activeTab === 'news' ? ['경기 소식', '선수 소식', '구단 소식'] : ['경기 하이라이트', '스페셜 영상', '팀 훈련'])
  ];

  return (
    <div>
      <NavBar />
      <h2 className='market-text'>한화 이글스 뉴스 & 하이라이트</h2> {/* Reusing market-text for consistent styling */}


      <Container fluid className="mt-4">
        <Row>
          <Col md={12}> 
            <div className="d-flex justify-content-center mb-4">
              <Button
                variant={activeTab === 'news' ? 'primary' : 'outline-primary'}
                onClick={() => { setActiveTab('news'); setSelectedCategory(null); setCurrentPage(1); setSearchTerm(''); }}
                className="mx-2"
              >
                뉴스
              </Button>
              <Button
                variant={activeTab === 'videos' ? 'primary' : 'outline-primary'}
                onClick={() => { setActiveTab('videos'); setSelectedCategory(null); setCurrentPage(1); setSearchTerm(''); }}
                className="mx-2"
              >
                영상 하이라이트
              </Button>
            </div>

            <div id='content-section'>
              <h2>{activeTab === 'news' ? '최신 뉴스' : '영상 하이라이트'}</h2>
            </div>
            <div className="d-flex justify-content-end align-items-center mb-3">
              <div id="searching" className="ms-auto">
                <form onSubmit={handleSearch} className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="제목 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <FaSearch />
                  </button>
                </form>
              </div>
            </div>

            <Row className='news-items'> 
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Col key={item.id} md={4} className="mb-4">
                    <div className='item-card' onClick={() => {
                      console.log(`Clicked on ${item.title}`);
                    }}>
                      <Card>
                        {activeTab === 'news' ? (
                          <Card.Img
                            variant="top"
                            src={item.image}
                            alt={item.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        ) : (
                          <Card.Img
                            variant="top"
                            src={item.thumbnail}
                            alt={item.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        )}
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          {activeTab === 'news' && <Card.Text>{item.description}</Card.Text>}
                          <Card.Text className="text-muted">{item.date} | {item.category}</Card.Text>
                          {activeTab === 'videos' && (
                            <Button variant="outline-danger" className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card onClick from firing
                                window.open(item.videoUrl, '_blank'); // Open video in new tab
                              }}
                            >
                              영상 보기
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))
              ) : (
                <Col><p>해당하는 {activeTab === 'news' ? '뉴스' : '영상 하이라이트'}가 없습니다.</p></Col>
              )}
            </Row>

            <div className="pagination text-center mt-4">
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  className={`page-button mx-1 ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default News;