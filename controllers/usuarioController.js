import Usuario from '../models/Usuario.js'
import Rol from '../models/Rol.js'
import bcrypt from 'bcrypt'

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

// Mostrar formulario de nuevo usuario
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

    const {

        rol_id,
        nombres,
        apellidos,
        correo,
        telefono,
        tipo_documento,
        numero_documento,
        password

    } = req.body

    const existeUsuario = await Usuario.findOne({

        where: {

            correo

        }

    })

    if (existeUsuario) {

        const roles = await Rol.findAll()

        return res.render('usuarios/crear', {

            pagina: 'Nuevo Usuario',

            usuario: req.usuario,

            roles,

            error: 'Ese correo ya está registrado.'

        })

    }

    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(password, salt)

    await Usuario.create({

        rol_id,

        nombres,

        apellidos,

        correo,

        telefono,

        tipo_documento,

        numero_documento,

        password: passwordHash,

        confirmado: true,

        estado: true

    })

    res.redirect('/usuarios')

}

// Mostrar formulario para editar usuario
const formularioEditarUsuario = async (req, res) => {

    const { id } = req.params

    const usuarioEditar = await Usuario.findByPk(id)

    const roles = await Rol.findAll()

    if (!usuarioEditar) {

        return res.redirect('/usuarios')

    }

    res.render('usuarios/editar', {

        pagina: 'Editar Usuario',

        usuario: req.usuario,

        usuarioEditar,

        roles

    })

}

// Actualizar usuario
const actualizarUsuario = async (req, res) => {

    const { id } = req.params

    const usuarioEditar = await Usuario.findByPk(id)

    if (!usuarioEditar) {

        return res.redirect('/usuarios')

    }

    const {

        rol_id,
        nombres,
        apellidos,
        correo,
        telefono,
        tipo_documento,
        numero_documento,
        estado

    } = req.body

    await usuarioEditar.update({

        rol_id,
        nombres,
        apellidos,
        correo,
        telefono,
        tipo_documento,
        numero_documento,
        estado

    })

    res.redirect('/usuarios')

}

export {

    listarUsuarios,
    formularioNuevoUsuario,
    guardarUsuario,
    formularioEditarUsuario,
    actualizarUsuario

}