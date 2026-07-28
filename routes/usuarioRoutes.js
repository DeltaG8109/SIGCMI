import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'
import {
    listarUsuarios,
    formularioNuevoUsuario,
    guardarUsuario,
    formularioEditarUsuario,
    actualizarUsuario
} from '../controllers/usuarioController.js'

const router = express.Router()

router.get('/', protegerRuta, listarUsuarios)

router.get('/crear', protegerRuta, formularioNuevoUsuario)

router.post('/crear', protegerRuta, guardarUsuario)

router.get('/editar/:id', protegerRuta, formularioEditarUsuario)

router.post('/editar/:id', protegerRuta, actualizarUsuario)
export default router