// routes/commentRoutes.js
import express from 'express';
import CommentController from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', CommentController.create);
router.put('/edit/:commentId', CommentController.edit);

export default router;
