import express from 'express'
import memoRoutes from './routes/memo.route'
import { PORT } from './environment'

const app = express()
app.use(express.json())

app.use('/memo', memoRoutes)

app.listen(PORT, () => console.log(`🟢 API running at http://localhost:${PORT}`))
