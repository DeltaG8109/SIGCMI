import express from 'express'

import protegerRuta from '../middleware/protegerRuta.js'

import { dashboard } from '../controllers/dashboardController.js'

const router = express.Router()

// Ruta protegida
router.get('/', protegerRuta, dashboard)

export default router