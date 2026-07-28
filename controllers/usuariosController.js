import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'
import Paciente from '../models/Paciente.js'
import generarToken from '../helpers/generarToken.js'
import db from '../config/db.js'
import { enviarEmailRegistro } from '../helpers/emails.js'
import generarJWT from '../helpers/generarJWT.js'
import Rol from '../models/Rol.js'

const formularioLogin = (req, res) => {
    res.render('auth/login')
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro')
}

const registrar = async (req, res) => {

    const {
        nombres,
        apellidos,
        correo,
        telefono,
        tipo_documento,
        numero_documento,
        password
    } = req.body

    try {

        const existeUsuario = await Usuario.findOne({
            where: { correo }
        })

        if (existeUsuario) {
            return res.send('El correo ya está registrado')
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const token = generarToken()

        const transaction = await db.transaction()

        try {

            const nuevoUsuario = await Usuario.create({

                rol_id: 3,

                nombres,
                apellidos,
                correo,
                telefono,
                tipo_documento,
                numero_documento,

                password: passwordHash,

                token,

                confirmado: false,

                estado: true

            }, { transaction })

            await Paciente.create({

                usuario_id: nuevoUsuario.id_usuario

            }, { transaction })

            await transaction.commit()

        } catch (error) {

            await transaction.rollback()

            throw error

        }

        try {

            await enviarEmailRegistro({
                nombres,
                correo,
                token
            })

        } catch (error) {

            console.log('❌ Error enviando correo:')
            console.log(error)

        }

        res.send('Usuario registrado correctamente')

    } catch (error) {

        console.log(error)

        res.send('Error al registrar')

    }

}

const confirmarCuenta = async (req, res) => {

    const { token } = req.params

    const usuario = await Usuario.findOne({
        where: { token }
    })

    if (!usuario) {
        return res.send('Token no válido')
    }

    usuario.confirmado = true
    usuario.token = null

    await usuario.save()

    res.send('Cuenta confirmada correctamente')
}

const autenticar = async (req, res) => {

    const { correo, password } = req.body

    const usuario = await Usuario.findOne({
        where: { correo }
    })

    if (!usuario) {
        return res.send('El usuario no existe')
    }

    if (!usuario.confirmado) {
        return res.send('Debes confirmar tu cuenta antes de iniciar sesión')
    }

    const passwordCorrecto = await usuario.verificarPassword(password)

    if (!passwordCorrecto) {
        return res.send('Contraseña incorrecta')
    }

    // Crear JWT
    const token = generarJWT(usuario.id_usuario)

    // Guardar cookie
    res.cookie('_token', token, {
        httpOnly: true
    })

    res.send('Inicio de sesión correcto')
}

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.findAll({

            include: [
                {
                    model: Rol,
                    attributes: ['nombre']
                },
                {
                    model: Paciente,
                    as: 'paciente'
                }
            ],

            attributes: {
                exclude: ['password', 'token']
            }

        })

        res.json(usuarios)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            mensaje: 'Error consultando usuarios'
        })

    }

}



// Obtener usuario por ID
const obtenerUsuario = async (req, res) => {

    try {

        const { id } = req.params


        const usuario = await Usuario.findByPk(id, {

            include: [
                {
                    model: Rol,
                    attributes: ['nombre']
                }
            ],

            attributes: {
                exclude: ['password', 'token']
            }

        })


        if (!usuario) {

            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })

        }


        res.json(usuario)


    } catch (error) {

        console.log(error)

        res.status(500).json({
            mensaje: 'Error buscando usuario'
        })

    }

}




// Actualizar usuario
const actualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params


        const usuario = await Usuario.findByPk(id)


        if (!usuario) {

            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })

        }


        await usuario.update(req.body)


        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario
        })


    } catch (error) {

        console.log(error)

        res.status(500).json({
            mensaje: 'Error actualizando usuario'
        })

    }

}




// Eliminar usuario
const eliminarUsuario = async (req, res) => {

    try {

        const { id } = req.params


        const usuario = await Usuario.findByPk(id)


        if (!usuario) {

            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })

        }


        await usuario.destroy()


        res.json({
            mensaje: 'Usuario eliminado'
        })


    } catch (error) {

        console.log(error)

        res.status(500).json({
            mensaje: 'Error eliminando usuario'
        })

    }

}




export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmarCuenta,
    autenticar,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
}