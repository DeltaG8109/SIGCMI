import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'

import {
    listarPrescripciones,
    formularioNuevaPrescripcion,
    guardarPrescripcion,
    formularioEditarPrescripcion,
    actualizarPrescripcion,
    eliminarPrescripcion
} from '../controllers/prescripcionController.js'

const router = express.Router()

router.get('/', protegerRuta, listarPrescripciones)

router.get('/crear', protegerRuta, formularioNuevaPrescripcion)
router.post('/crear', protegerRuta, guardarPrescripcion)

router.get('/editar/:id', protegerRuta, formularioEditarPrescripcion)
router.post('/editar/:id', protegerRuta, actualizarPrescripcion)

router.post('/eliminar/:id', protegerRuta, eliminarPrescripcion)

export default router