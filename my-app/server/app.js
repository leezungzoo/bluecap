const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // 고유 ID 생성을 위해
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'ohs27122760@',
    database: 'bluecap_db'
})

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

//회원가입
app.post('/api/signup', (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ success: false, message: "모든 필드가 입력되지 않았습니다" });
  }

  //비밀번호 해싱
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Bcrypt 해싱 에러:', err);
      return res.status(500).json({ success: false, message: '서버에서 오류발생.' });
    }

    const sql = "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)"
    const values = [name, email, username, hashedPassword];

    db.query(sql, values, (dbErr, result) => {
      if (dbErr) {
        console.error('MySQL 쿼리 에러:', dbErr);
        if (dbErr.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ success: false, message: '이미 사용 중인 아이디 또는 이메일입니다.' });
        }
        return res.status(500).json({ success: false, message: '데이터베이스 오류입니다.' });
      }

      console.log('회원가입 성공');
      res.status(201).json({ success: true, message: '회원가입이 완료되었습니다.'});
    });
  });
});

// 로그인
// app.js 파일에서

app.post('/api/login', (req, res) => {
    const { username, password } = req.body; // 프런트엔드에서 받은 값

    console.log('--- 로그인 요청 시작 ---');
    console.log('클라이언트로부터 받은 아이디 (username):', username);

    if (!username || !password) {
        console.log('아이디 또는 비밀번호 누락');
        return res.status(400).json({ success: false, message: '아이디와 비밀번호를 입력해주세요.' });
    }

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('로그인 중 데이터베이스 쿼리 오류:', err);
            return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
        }

        console.log('DB 조회 결과 (results 배열):', results);

        if (results.length === 0) {
            console.log('DB에서 사용자를 찾을 수 없음:', username); // 사용자가 DB에 없는 경우
            return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = results[0];
        console.log('DB에서 찾은 사용자 객체 (user):', user); // 4. DB에서 찾은 사용자 객체 전체
        console.log('DB에서 찾은 사용자 이름 (user.username):', user.username);
        console.log('DB에 저장된 해싱된 비밀번호 (user.password):', user.password); // 5. DB에서 가져온 해싱된 비밀번호

        console.log('bcrypt.compare 첫 번째 인자 (사용자 입력 password):', password);
        console.log('bcrypt.compare 두 번째 인자 (DB user.password):', user.password);

        try {
            const isMatch = await bcrypt.compare(password, user.password); // 6. 실제 비교 결과
            console.log('bcrypt.compare 결과 (비밀번호 일치 여부):', isMatch);

            if (isMatch) {
                console.log('로그인 성공:', username);
                res.json({ success: true, message: `환영합니다 ${user.name} 님!`, user: { id: user.id, name: user.name, username: user.username, email: user.email } });
            } else {
                console.log('비밀번호 불일치: bcrypt.compare 결과 false');
                res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }
        } catch (compareError) {
            console.error('bcrypt.compare 오류:', compareError); // bcrypt.compare 자체에서 오류 발생 시
            res.status(500).json({ success: false, message: '비밀번호 비교 중 오류가 발생했습니다.' });
        }
        console.log('--- 로그인 요청 종료 ---');
    });
});

//로그아웃
app.post('/api/logout', (req, res) => {
  console.log('로그아웃 요청을 수신');
  res.status(200).json({ success: true, message: '서버에서 로그아웃 처리가 완료' });
});

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
        cb(null, 'uploads/'); // 이미지가 저장될 디렉토리 - 이 경로가 정확한지, 쓰기 권한이 있는지 확인
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 파일명 생성
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
            date: new Date().toISOString(), // ISO 8601 형식으로 저장 (날짜/시간 파싱에 가장 안전)
            tags: tags ? (Array.isArray(tags) ? tags : [tags]) : []
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
            // 오래된 순 (가장 오래된 글이 위에 오도록) -> 최신순으로 수정해보려 했으나 실패함 (버그)
            posts.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (filter === 'comments') {
            // 댓글 수 계산
            const commentCounts = comments.reduce((acc, comment) => {
                acc[comment.postId] = (acc[comment.postId] || 0) + 1;
                return acc;
            }, {});
            // 댓글 수에 따른 내림차순 정렬 (댓글이 많은 글이 위에 오도록)
            posts.sort((a, b) => (commentCounts[b.id] || 0) - (commentCounts[a.id] || 0));
        } else {
            // 기본 정렬: 최신순 -> 현재 오래된순 (버그)
            posts.sort((a, b) => new Date(a.date) - new Date(b.date));
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
            date: new Date().toISOString(), // 날짜 형식을 ISO 8601로 변경
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
        postComments.sort((a, b) => new Date(b.date) - new Date(a.date)); // 댓글은 최신순 (가장 최근 댓글이 위에 오도록)

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
            date: new Date().toISOString(), // 날짜 형식을 ISO 8601로 변경
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