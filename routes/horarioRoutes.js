import express from 'express'

import protegerRuta from '../middleware/protegerRuta.js'

import {
    listarHorarios,
    formularioNuevoHorario,
    guardarHorario
} from '../controllers/horarioController.js'

const router = express.Router()

//Ruta de Horarios
router.get('/', protegerRuta, listarHorarios)

// Mostrar formulario
router.get('/crear', protegerRuta, formularioNuevoHorario)

// Guardar horario
router.post('/crear', protegerRuta, guardarHorario)

export default router