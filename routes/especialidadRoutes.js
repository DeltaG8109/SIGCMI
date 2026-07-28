import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'
import { listarEspecialidades } from '../controllers/especialidadController.js'
import {
    formularioNuevaEspecialidad,
    guardarEspecialidad,
    formularioEditarEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
} from '../controllers/especialidadController.js'
import { body } from 'express-validator'

const router = express.Router()

// Mostrar formulario
router.get('/crear', protegerRuta, formularioNuevaEspecialidad)

// Guardar especialidad
router.post(
    '/crear',

    protegerRuta,

    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('Debe tener entre 3 y 100 caracteres'),

    guardarEspecialidad
)

// Mostrar todas las especialidades
router.get('/', protegerRuta, listarEspecialidades)

//Ruta para editar especialidades
router.get('/editar/:id', protegerRuta, formularioEditarEspecialidad)

// Actualizar especialidad
router.post('/editar/:id', protegerRuta, actualizarEspecialidad)

// Eliminar especialidad
router.post('/eliminar/:id', protegerRuta, eliminarEspecialidad)

export default router