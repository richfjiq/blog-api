import { Router } from 'express';
import { createBlog, getBlogs } from '../controllers/blog';

const router = Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/:blogId');
