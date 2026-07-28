import express from 'express'
import {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmarCuenta,
    autenticar,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
} from '../controllers/usuariosController.js'
import protegerRuta from '../middleware/protegerRuta.js'

const router = express.Router()

router.get('/login', formularioLogin)
router.post('/login', autenticar)

router.get('/registro', formularioRegistro)

router.post('/registro', registrar)

router.get('/confirmar/:token', confirmarCuenta)

//Ruta de prueba
router.get('/dashboard', protegerRuta, (req, res) => {

    res.send('Bienvenido al Dashboard')

})

router.get('/', obtenerUsuarios)

router.get('/:id', obtenerUsuario)

router.put('/:id', actualizarUsuario)

router.delete('/:id', eliminarUsuario)


export default router