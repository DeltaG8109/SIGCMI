import Paciente from '../models/Paciente.js'
import Usuario from '../models/Usuario.js'
import { Op } from 'sequelize'

// Listar pacientes
const listarPacientes = async (req, res) => {

    const pacientes = await Paciente.findAll({

        include: [

            {

                model: Usuario,

                as: 'usuario'

            }

        ]

    })

    res.render('pacientes/index', {

        pagina: 'Pacientes',

        usuario: req.usuario,

        pacientes

    })

}

// Mostrar formulario

const formularioNuevoPaciente = async (req, res) => {

    const pacientes = await Paciente.findAll({

        attributes: ['usuario_id']

    })

    const usuariosOcupados = pacientes.map(paciente => paciente.usuario_id)

    const usuarios = await Usuario.findAll({

        where: {

            rol_id: 3,

            id_usuario: {
                [Op.notIn]: usuariosOcupados
            }

        }

    })

    res.render('pacientes/crear', {

        pagina: 'Nuevo Paciente',

        usuario: req.usuario,

        usuarios

    })

}

// Guardar paciente
// Guardar paciente
const guardarPaciente = async (req, res) => {

    const {

        usuario_id,
        fecha_nacimiento,
        tipo_sangre,
        alergias,
        condiciones_medicas,
        direccion,
        departamento,
        ciudad

    } = req.body

    // Verificar si el usuario ya tiene un paciente registrado
    const existePaciente = await Paciente.findOne({

        where: {

            usuario_id

        }

    })

    if (existePaciente) {

        // Obtener los usuarios que ya tienen paciente
        const pacientes = await Paciente.findAll({

            attributes: ['usuario_id']

        })

        const usuariosOcupados = pacientes.map(paciente => paciente.usuario_id)

        // Solo mostrar usuarios disponibles
        const usuarios = await Usuario.findAll({

            where: {

                rol_id: 3,

                id_usuario: {

                    [Op.notIn]: usuariosOcupados

                }

            }

        })

        return res.render('pacientes/crear', {

            pagina: 'Nuevo Paciente',

            usuario: req.usuario,

            usuarios,

            error: 'Ese usuario ya tiene un paciente registrado.'

        })

    }

    // Crear paciente
    await Paciente.create({

        usuario_id,
        fecha_nacimiento,
        tipo_sangre,
        alergias,
        condiciones_medicas,
        direccion,
        departamento,
        ciudad

    })

    res.redirect('/pacientes')

}

// Mostrar formulario de edición
const formularioEditarPaciente = async (req, res) => {

    const { id } = req.params

    const paciente = await Paciente.findByPk(id, {

        include: [

            {

                model: Usuario,

                as: 'usuario'

            }

        ]

    })

    if (!paciente) {

        return res.redirect('/pacientes')

    }

    res.render('pacientes/editar', {

        pagina: 'Editar Paciente',

        usuario: req.usuario,

        paciente

    })

}

// Actualizar paciente
const actualizarPaciente = async (req, res) => {

    const { id } = req.params

    const paciente = await Paciente.findByPk(id)

    if (!paciente) {

        return res.redirect('/pacientes')

    }

    const {

        fecha_nacimiento,
        tipo_sangre,
        alergias,
        condiciones_medicas,
        direccion,
        departamento,
        ciudad

    } = req.body

    await paciente.update({

        fecha_nacimiento,
        tipo_sangre,
        alergias,
        condiciones_medicas,
        direccion,
        departamento,
        ciudad

    })

    res.redirect('/pacientes')

}

export {

    listarPacientes,

    formularioNuevoPaciente,

    guardarPaciente,

    actualizarPaciente,

    formularioEditarPaciente

}