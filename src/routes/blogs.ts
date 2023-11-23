import { Router } from 'express';
import { createBlog, getBlogById, getBlogs } from '../controllers/blog';

const router = Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/:blogId', getBlogById);

export default router;
