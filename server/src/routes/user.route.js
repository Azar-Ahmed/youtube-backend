import express from "express";
import {signUp, signIn, signOut, updateProfile, subscribe } from '../controllers/user.controller.js'
import {isAuthenticated} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/signout', signOut)
router.put('/update', isAuthenticated, updateProfile)
router.post('/subscribe', isAuthenticated, subscribe)

export default router;