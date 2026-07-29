import express from 'express'

import protegerRuta from '../middleware/protegerRuta.js'

import {
    listarMedicos,
    formularioNuevoMedico,
    guardarMedico,
    formularioEditarMedico,
    editarMedico,
    eliminarMedico

} from '../controllers/medicoController.js'

const router = express.Router()

// Listado de médicos
router.get('/', protegerRuta, listarMedicos)

// Formulario para crear médico
router.get('/crear', protegerRuta, formularioNuevoMedico)

// Guardar médico
router.post('/crear', protegerRuta, guardarMedico)

// Formulario editar
router.get('/editar/:id', protegerRuta, formularioEditarMedico)

// Guardar cambios
router.post('/editar/:id', protegerRuta, editarMedico)

// Eliminar médico
router.get('/eliminar/:id', protegerRuta, eliminarMedico)

export default router