import express from "express";
import {
  upload,
  updateVideoDetails,
  deleteVideo,
  getAllVideos,
  getVideoByID,
  getVideoByCategory,
  getVideoByTags,
  getMyVideos,
  likeVideo,
  dislikeVideo
} from '../controllers/video.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/all', getAllVideos);
router.get('/:id', getVideoByID);
router.get('/category/:category', getVideoByCategory);
router.get('/tags/:tags', getVideoByTags);

// Protected routes
router.get('/my-videos', isAuthenticated, getMyVideos);

router.post('/upload', isAuthenticated, upload);
router.post('/like', isAuthenticated, likeVideo);
router.post('/dislike', isAuthenticated, dislikeVideo);

router.put('/update/:id', isAuthenticated, updateVideoDetails);

router.delete('/delete/:id', isAuthenticated, deleteVideo);

export default router;
