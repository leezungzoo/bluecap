const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // 고유 ID 생성을 위해

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const postsFilePath = path.join(__dirname, 'posts.json');
const commentsFilePath = path.join(__dirname, 'comments.json'); // 댓글 파일 경로 추가

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

if (!fs.existsSync(postsFilePath)) {
    fs.writeFileSync(postsFilePath, JSON.stringify([]));
}
// comments.json 파일이 없으면 초기화
if (!fs.existsSync(commentsFilePath)) {
    fs.writeFileSync(commentsFilePath, JSON.stringify([]));
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// 게시글 생성 (POST /api/posts)
app.post('/api/posts', upload.single('image'), (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });
        }

        const newPost = {
            id: uuidv4(),
            title,
            content,
            image,
            date: new Date().toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
            tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [] // 태그가 단일 문자열로 올 수도 있으므로 배열로 처리
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

// 모든 게시글 조회 (GET /api/posts) - 페이지네이션 및 필터링/태그 적용
app.get('/api/posts', (req, res) => {
    try {
        let posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
        const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8')); // 댓글 데이터 로드

        const { filter, tag, page = 1 } = req.query; // filter, tag, page 쿼리 파라미터 받기
        const limit = 6; // 한 페이지당 게시글 수 6개로 고정 

        // 태그 필터링
        if (tag) {
            posts = posts.filter(post => post.tags && post.tags.includes(tag));
        }

        // 필터링 (정렬)
        if (filter === 'latest') {
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (filter === 'comments') {
            // 댓글 수 계산
            const commentCounts = comments.reduce((acc, comment) => {
                acc[comment.postId] = (acc[comment.postId] || 0) + 1;
                return acc;
            }, {});
            // 댓글 수에 따른 내림차순 정렬
            posts.sort((a, b) => (commentCounts[b.id] || 0) - (commentCounts[a.id] || 0));
        } else {
            // 기본 정렬: 최신순 (date 필드 기준)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // 페이지네이션 적용
        const parsedPage = parseInt(page);

        const startIndex = (parsedPage - 1) * limit;
        const endIndex = parsedPage * limit;

        const results = {};
        results.totalPosts = posts.length;
        results.totalPages = Math.ceil(posts.length / limit);
        results.currentPage = parsedPage;

        results.posts = posts.slice(startIndex, endIndex);

        res.status(200).json(results); // 페이지네이션 정보와 함께 반환
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

        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: '게시글을 불러오는 중 오류가 발생했습니다.', error: error.message });
    }
});

// 댓글 생성 (POST /api/posts/:postId/comments)
app.post('/api/posts/:postId/comments', (req, res) => {
    try {
        const postId = req.params.postId;
        const { author, content } = req.body;

        if (!author || !content) {
            return res.status(400).json({ message: '작성자와 내용을 입력해주세요.' });
        }

        const newComment = {
            id: uuidv4(),
            postId,
            author,
            content,
            date: new Date().toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
            replies: []
        };

        const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
        comments.push(newComment);
        fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));

        res.status(201).json({ message: '댓글이 성공적으로 작성되었습니다.', comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: '댓글 작성 중 오류가 발생했습니다.', error: error.message });
    }
});

// 특정 게시글의 댓글 조회 (GET /api/posts/:postId/comments) - 페이지네이션 적용
app.get('/api/posts/:postId/comments', (req, res) => {
    try {
        const postId = req.params.postId;
        const { page = 1 } = req.query; // page 쿼리 파라미터 받기
        const limit = 6; // 한 페이지당 댓글 수 6개로 고정

        const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
        let postComments = comments.filter(comment => comment.postId === postId);
        postComments.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순 정렬

        // 페이지네이션 적용
        const parsedPage = parseInt(page);

        const startIndex = (parsedPage - 1) * limit;
        const endIndex = parsedPage * limit;

        const results = {};
        results.totalComments = postComments.length;
        results.totalPages = Math.ceil(postComments.length / limit);
        results.currentPage = parsedPage;

        results.comments = postComments.slice(startIndex, endIndex);

        res.status(200).json(results); // 페이지네이션 정보와 함께 반환
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: '댓글을 불러오는 중 오류가 발생했습니다.', error: error.message });
    }
});

// 대댓글 생성 (POST /api/comments/:commentId/replies)
app.post('/api/comments/:commentId/replies', (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { author, content } = req.body;

        if (!author || !content) {
            return res.status(400).json({ message: '작성자와 내용을 입력해주세요.' });
        }

        const newReply = {
            id: uuidv4(),
            author,
            content,
            date: new Date().toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
        };

        const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
        const commentIndex = comments.findIndex(c => c.id === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        }

        comments[commentIndex].replies.push(newReply);
        fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));

        res.status(201).json({ message: '대댓글이 성공적으로 작성되었습니다.', reply: newReply });
    } catch (error) {
        console.error('Error creating reply:', error);
        res.status(500).json({ message: '대댓글 작성 중 오류가 발생했습니다.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});