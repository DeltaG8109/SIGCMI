import express from 'express'

import protegerRuta from '../middleware/protegerRuta.js'

import {
    listarCitas,
    formularioNuevaCita,
    guardarCita,
    formularioEditarCita,
    editarCita,
    formularioCancelarCita,
    cancelarCita,
    confirmarCita,
    finalizarCita
} from '../controllers/citaController.js'

const router = express.Router()

router.get('/', protegerRuta, listarCitas)

// Mostrar formulario
router.get('/crear', protegerRuta, formularioNuevaCita)

// Guardar cita
router.post('/crear', protegerRuta, guardarCita)

// Mostrar formulario de edición
router.get('/editar/:id', protegerRuta, formularioEditarCita)

// Guardar cambios
router.post('/editar/:id', protegerRuta, editarCita)

// Mostrar formulario de cancelación
router.get('/cancelar/:id', protegerRuta, formularioCancelarCita)

// Guardar cancelación
router.post('/cancelar/:id', protegerRuta, cancelarCita)

//Ruta de confirmar cita
router.get('/confirmar/:id', protegerRuta, confirmarCita)

//Ruta de finalizar Cita
router.get('/finalizar/:id', protegerRuta, finalizarCita)

export default router