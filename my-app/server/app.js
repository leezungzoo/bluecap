const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // 고유 ID 생성을 위해

const app = express();
const PORT = 5000; // React 앱(3000번)과 충돌하지 않도록 5000번 포트 사용

// CORS 활성화 (모든 도메인 허용 - 개발용)
app.use(cors());

// JSON 요청 본문 파싱
app.use(express.json());

// 정적 파일 제공 (업로드된 이미지 접근용)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// posts.json 파일 경로
const postsFilePath = path.join(__dirname, 'posts.json');

// uploads 디렉토리가 없으면 생성
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// posts.json 파일이 없으면 초기화
if (!fs.existsSync(postsFilePath)) {
    fs.writeFileSync(postsFilePath, JSON.stringify([]));
}

// Multer 설정 (이미지 업로드 처리)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 이미지가 저장될 디렉토리
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 게시글 생성 (POST /api/posts)
app.post('/api/posts', upload.single('image'), (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const image = req.file ? req.file.filename : null; // 업로드된 이미지 파일명

        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });
        }

        const newPost = {
            id: uuidv4(), // 고유 ID 생성
            title,
            content,
            image, // 이미지 파일명
            date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''), // 'YYYY.MM.DD' 형식
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(',') : []) // 태그 배열로 저장
        };

        const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
        posts.push(newPost);
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

        res.status(201).json({ message: '게시글이 성공적으로 작성되었습니다.', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: '게시글 작성 중 오류가 발생했습니다.', error: error.message });
    }
});

// 모든 게시글 조회 (GET /api/posts)
app.get('/api/posts', (req, res) => {
    try {
        const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
        // 최신순으로 정렬 (id는 생성 순서와 같다고 가정하거나, 실제 date 필드를 사용하여 정렬)
        // id를 uuidv4로 생성했으므로, 편의상 date 필드를 기준으로 정렬
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: '게시글을 불러오는 중 오류가 발생했습니다.', error: error.message });
    }
});

// 특정 게시글 조회 (GET /api/posts/:id)
app.get('/api/posts/:id', (req, res) => {
    try {
        const postId = req.params.id;
        const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
        const post = posts.find(p => p.id === postId);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('Error fetching single post:', error);
        res.status(500).json({ message: '게시글을 불러오는 중 오류가 발생했습니다.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Node.js backend running on http://localhost:${PORT}`);
});