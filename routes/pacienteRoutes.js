import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'
import {

    listarPacientes,
    formularioNuevoPaciente,
    guardarPaciente,
    formularioEditarPaciente,
    actualizarPaciente

} from '../controllers/pacienteController.js'

const router = express.Router()

router.get('/', protegerRuta, listarPacientes)

router.get('/crear', protegerRuta, formularioNuevoPaciente)

router.post('/crear', protegerRuta, guardarPaciente)

router.get('/editar/:id', protegerRuta, formularioEditarPaciente)

router.post('/editar/:id', protegerRuta, actualizarPaciente)

export default router