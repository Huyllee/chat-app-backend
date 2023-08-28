import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/posts';

const router = express.Router();

router.get('/', getPosts);

router.post('/', createPost)

router.put('/update', updatePost)

export default router;