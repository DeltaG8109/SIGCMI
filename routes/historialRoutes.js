import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'
import { verHistorial } from '../controllers/historialController.js'

const router = express.Router()

router.get('/:id', protegerRuta, verHistorial)

export default router