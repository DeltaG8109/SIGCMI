import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'

import {
    listarDiagnosticos,
    formularioNuevoDiagnostico,
    guardarDiagnostico,
    verDiagnostico
} from '../controllers/diagnosticoController.js'

const router = express.Router()

router.get('/', protegerRuta, listarDiagnosticos)

router.get('/crear', protegerRuta, formularioNuevoDiagnostico)

router.post('/crear', protegerRuta, guardarDiagnostico)

router.get('/ver/:id', protegerRuta, verDiagnostico)

export default router