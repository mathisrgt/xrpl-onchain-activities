import { Router, Request, Response, NextFunction } from 'express'
import { create, generate, text } from '../controllers/memo.controller'

const router = Router()

router.post('/create', create); // Not available for interactive content
router.post('/generate', generate);
router.get('/text', text);
// router.get('/get', MemoController.getAll)
// router.post('/watch', MemoController.watch)

export default router
