import express from 'express'
import protegerRuta from '../middleware/protegerRuta.js'

import {
    listarUsuarios,
    formularioNuevoUsuario,
    guardarUsuario
} from '../controllers/usuarioController.js'

const router = express.Router()

router.get('/', protegerRuta, listarUsuarios)

router.get('/crear', protegerRuta, formularioNuevoUsuario)

router.post('/crear', protegerRuta, guardarUsuario)

export default router