import { Router, Request, Response, NextFunction } from 'express'
import { create, generate } from '../controllers/memo.controller'

const router = Router()

router.post('/create', create);
router.post('/generate', generate);
// router.get('/content', MemoController.getContent)
// router.get('/get', MemoController.getAll)
// router.post('/watch', MemoController.watch)

export default router
