import express from 'express';
import { addJob, updateJobApplication ,deleteJobApplication, getAllJobsByUser, getJob} from '../controllers/jobController.js';

const router = express.Router();

router.post('/addJob', addJob);
router.put("/updateJob/:id",updateJobApplication);
router.delete("/deleteJob/:id", deleteJobApplication);
router.get('/getAllJobsByUser/:userId', getAllJobsByUser);
router.get('/getJob/:id', getJob);



export default router;