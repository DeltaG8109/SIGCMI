import Usuario from '../models/Usuario.js'
import Rol from '../models/Rol.js'

// Listar usuarios
const listarUsuarios = async (req, res) => {

    const usuarios = await Usuario.findAll({

        include: [
            {
                model: Rol,
                as: 'rol'
            }
        ]

    })

    res.render('usuarios/index', {

        pagina: 'Usuarios',

        usuario: req.usuario,

        usuarios

    })

}

// Mostrar formulario
const formularioNuevoUsuario = async (req, res) => {

    const roles = await Rol.findAll()

    res.render('usuarios/crear', {

        pagina: 'Nuevo Usuario',

        usuario: req.usuario,

        roles

    })

}

// Guardar usuario
const guardarUsuario = async (req, res) => {

    res.send('Guardar Usuario')

}

export {

    listarUsuarios,
    formularioNuevoUsuario,
    guardarUsuario

}