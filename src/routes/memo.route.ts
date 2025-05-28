import { Router } from 'express'
import { create, text, status, generate, watch } from '../controllers/memo.controller'

const router = Router()

// Required endpoints
router.post('/create', create); // Not available for interactive content
router.get('/text', text);
router.get('/status', status); // TODO: Protected, only accessible by the app

// Interactive content endpoints
router.post('/generate', generate);
router.post('/watch', watch);

export default router
