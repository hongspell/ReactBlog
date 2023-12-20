import express from 'express';
import { getPosts, addPost, deletePost, getPost, updatePost } from '../controllers/post.js';

const router = express.Router();

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)


export default router;