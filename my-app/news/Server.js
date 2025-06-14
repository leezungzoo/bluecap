// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
const port = 3001; // React 앱과 다른 포트 사용

// CORS 설정: 모든 Origin에서의 요청을 허용 (개발 단계에서만 권장)
app.use(cors());

// 한화 이글스 공식 웹사이트 뉴스 페이지 URL
const HANWHA_NEWS_URL = 'https://www.hanwhaeagles.co.kr/html/eagles/news/news_list.asp?iPageNo=1&iGroupID=1001&iCategoryID=100101';
// 주의: 웹사이트 구조 변경 시 이 URL 또는 셀렉터가 변경될 수 있습니다.

app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get(HANWHA_NEWS_URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const newsList = [];

        // 뉴스 목록을 포함하는 HTML 요소 선택
        // 웹사이트 구조를 분석하여 정확한 셀렉터를 찾아야 합니다.
        // F12 개발자 도구 -> Elements 탭에서 해당 뉴스 목록의 HTML 구조를 확인하세요.
        // 이 예시에서는 가상의 셀렉터를 사용했습니다. 실제 웹사이트에 맞게 수정해야 합니다.
        // 예시: '.news_list_area ul li' 또는 '.news-item' 등
        $('ul.news_list > li').each((index, element) => {
            const title = $(element).find('.news_title > a').text().trim();
            const link = $(element).find('.news_title > a').attr('href');
            const date = $(element).find('.date').text().trim();
            const image = $(element).find('.thumbnail_img > img').attr('src'); // 썸네일 이미지

            // 상대 경로 링크를 절대 경로로 변환
            const fullLink = link ? new URL(link, HANWHA_NEWS_URL).href : null;
            const fullImage = image ? new URL(image, HANWHA_NEWS_URL).href : null;


            if (title && fullLink && date) { // 필요한 정보가 모두 있는 경우만 추가
                newsList.push({
                    id: index, // 임시 ID
                    title: title,
                    link: fullLink,
                    date: date,
                    image: fullImage // 이미지 URL 추가
                });
            }
        });

        res.json(newsList);

    } catch (error) {
        console.error('크롤링 에러:', error);
        res.status(500).json({ error: '뉴스 데이터를 가져오는 데 실패했습니다.' });
    }
});

app.listen(port, () => {
    console.log(`Node.js 크롤러 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});