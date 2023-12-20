import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    // query by category
    const q = req.query.cat 
    ? "SELECT * FROM posts WHERE cat = ? AND status=0" 
    : "SELECT * FROM posts AND status=0";

    db.query(q, [req.query.cat], (err, data) => {
        if(err) return res.status(500).json(err);   // OR return res.send(err)
        return res.status(200).json(data);
    });
};

export const getPost = (req, res) => {

    const q = "SELECT p.id, u.username, p.title, p.desc, p.img, u.img uImg, p.cat, p.date FROM posts p LEFT JOIN users u ON p.uid=u.id WHERE p.id = ? AND p.status=0 LIMIT 1";
    
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });

};

export const addPost = (req, res) => {
    console.log(req.body);
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");
    // 第二个参数是token验证和生成的用的公钥，在/controllers/auth.js里面也用到了，因此最好把这个公钥做全局化，不然一处改了，另一处忘改会验证失败
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");
        
        const q = "INSERT INTO posts (`uid`, `title`, `desc`, `img`, `cat`, `date`, `status`) VALUES (?, ?, ?, ?, ?, ?, '0')";

        const values = [
            userInfo.id,
            req.body.title || '',
            req.body.desc || '',
            req.body.img || 'https://picsum.photos/200/300',
            req.body.cat || '0',
            new Date()
        ];

        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post created!");
        });

    });
};

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");
    // 第二个参数是token验证和生成的用的公钥，在/controllers/auth.js里面也用到了，因此最好把这个公钥做全局化，不然一处改了，另一处忘改会验证失败
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");
        
        const postId = req.params.id;

        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE id = ? AND uid=? LIMIT 1";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat
        ];
        
        db.query(q, [...values, postId,userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post updated!");
        });

    });
};

// 软删除，通过状态字段设置
export const deletePost = (req, res) => {
    // CHECK OPERATOR'S AUTHORITY
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");
    // 第二个参数是token验证和生成的用的公钥，在/controllers/auth.js里面也用到了，因此最好把这个公钥做全局化，不然一处改了，另一处忘改会验证失败
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");
        // DELETE POST
        const postId = req.params.id;
        const q = "UPDATE posts SET status=1 WHERE id = ? AND uid=?";
        db.query(q, [postId, userInfo.id], (err, data) => {
            if(err) return res.status(403).json("You cannot delete this post!");
            return res.status(200).json("Post deleted!");
        });
    });
};

