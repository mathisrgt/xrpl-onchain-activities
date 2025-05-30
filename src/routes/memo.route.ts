import { Router } from 'express'
import { generate, watch } from '../controllers/memo.controller'

const router = Router()

router.post('/generate', generate);
router.post('/watch', watch);

export default router
