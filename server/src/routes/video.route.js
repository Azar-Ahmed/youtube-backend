import express from "express";
import {signUp, signIn, signOut, updateProfile } from '../controllers/user.controller.js'
import {isAuthenticated} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/signout', signOut)
router.put('/update', isAuthenticated, updateProfile)

export default router;