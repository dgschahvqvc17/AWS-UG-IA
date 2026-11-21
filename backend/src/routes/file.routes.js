import { Router } from 'express';
import * as FileController from '../controllers/file.controller.js';

const router = Router();

router.get('/', FileController.list);
router.post('/upload-url', FileController.uploadUrl);
router.get('/download-url', FileController.downloadUrl);

export default router;
