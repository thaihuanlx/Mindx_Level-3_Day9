// routes/postRoutes.js
import express from 'express';
import PostController from '../controllers/postController.js';

const router = express.Router();

router.post('/create', PostController.create);
router.put('/edit/:postId', PostController.edit);

export default router;
