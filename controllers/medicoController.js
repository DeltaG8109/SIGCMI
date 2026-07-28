import Medico from '../models/Medico.js'
import Especialidad from '../models/Especialidad.js'
import Usuario from '../models/Usuario.js'
import { Op } from 'sequelize'

const listarMedicos = async (req, res) => {

    const medicos = await Medico.findAll({

        include: [

            {
                model: Usuario,
                as: 'usuario'
            },

            {
                model: Especialidad,
                as: 'especialidad'
            }

        ]

    })

    res.render('medicos/index', {

        pagina: 'Médicos',

        usuario: req.usuario,

        medicos

    })

}

// Mostrar formulario
const formularioNuevoMedico = async (req, res) => {

    // Buscar los médicos ya registrados
    const medicos = await Medico.findAll({
        attributes: ['usuario_id']
    })

    // Obtener solo los IDs
    const usuariosRegistrados = medicos.map(medico => medico.usuario_id)

    // Buscar usuarios que aún no sean médicos
    const usuarios = await Usuario.findAll({

        where: {

            rol_id: 2,

            id_usuario: {
                [Op.notIn]: usuariosRegistrados
            }

        }

    })

    const especialidades = await Especialidad.findAll()

    res.render('medicos/crear', {

        pagina: 'Nuevo Médico',

        usuario: req.usuario,

        usuarios,

        especialidades

    })

}

// Guardar médico
const guardarMedico = async (req, res) => {

    const {

        usuario_id,

        especialidad_id,

        cedula_profesional,

        anios_experiencia

    } = req.body

    const existeMedico = await Medico.findOne({

        where: {
            usuario_id
        }

    })

    if (existeMedico) {

        return res.send('Ese usuario ya está registrado como médico')

    }

    const existeCedula = await Medico.findOne({

        where: {

            cedula_profesional: req.body.cedula_profesional,

            id_medico: {

                [Op.ne]: id

            }

        }

    })

    if (existeCedula) {

        return res.send('La cédula profesional ya existe')

    }

    await Medico.create({

        usuario_id,

        especialidad_id,

        cedula_profesional,

        anios_experiencia

    })

    res.redirect('/medicos')

}

// Mostrar formulario de edición
const formularioEditarMedico = async (req, res) => {

    const { id } = req.params

    const medico = await Medico.findByPk(id)

    const usuarios = await Usuario.findAll()

    const especialidades = await Especialidad.findAll()

    res.render('medicos/editar', {

        pagina: 'Editar Médico',

        usuario: req.usuario,

        medico,

        usuarios,

        especialidades

    })

}

// Guardar cambios del médico
const editarMedico = async (req, res) => {

    const { id } = req.params

    const medico = await Medico.findByPk(id)

    if (!medico) {
        return res.send('Médico no encontrado')
    }

    medico.usuario_id = req.body.usuario_id
    medico.especialidad_id = req.body.especialidad_id
    medico.cedula_profesional = req.body.cedula_profesional
    medico.anios_experiencia = req.body.anios_experiencia

    await medico.save()

    res.redirect('/medicos')

}

// Eliminar médico
const eliminarMedico = async (req, res) => {

    const { id } = req.params

    const medico = await Medico.findByPk(id)

    if (!medico) {
        return res.send('El médico no existe')
    }

    await medico.destroy()

    res.redirect('/medicos')

}

export {
    listarMedicos,
    formularioNuevoMedico,
    guardarMedico,
    formularioEditarMedico,
    editarMedico,
    eliminarMedico
}