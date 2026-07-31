

import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'
import { verCalendario } from '../controllers/calendarioController.js'
import { obtenerEventos } from '../controllers/calendarioController.js'

const router = express.Router()

router.get('/', protegerRuta, verCalendario)

//Ruta de Obtener Eventos
router.get('/eventos', protegerRuta, obtenerEventos)
export default router