import express from 'express';
import { register, login,  verifyOTP, resendOTP } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verifyOTP', verifyOTP);
router.post('/resendOTP', resendOTP);


export default router;