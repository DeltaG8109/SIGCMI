import express from 'express'
import { dashboard } from '../controllers/adminController.js'
import protegerRuta from '../middleware/protegerRuta.js'

const router = express.Router()

router.get('/dashboard', protegerRuta, dashboard)

export default router