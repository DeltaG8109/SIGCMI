import Especialidad from '../models/Especialidad.js'
import Medico from '../models/Medico.js'
import { Op } from 'sequelize'

// ================================
// Listar especialidades
// ================================
const listarEspecialidades = async (req, res) => {

    const especialidades = await Especialidad.findAll({

        order: [['nombre', 'ASC']]

    })

    res.render('especialidades/index', {

        pagina: 'Especialidades',

        usuario: req.usuario,

        especialidades

    })

}

// ================================
// Mostrar formulario
// ================================
const formularioNuevaEspecialidad = (req, res) => {

    res.render('especialidades/crear', {

        pagina: 'Nueva Especialidad',

        usuario: req.usuario

    })

}

// ================================
// Guardar especialidad
// ================================
const guardarEspecialidad = async (req, res) => {

    const { nombre, descripcion } = req.body

    const existe = await Especialidad.findOne({

        where: {

            nombre

        }

    })

    if (existe) {

        return res.send('La especialidad ya existe')

    }

    await Especialidad.create({

        nombre,

        descripcion

    })

    res.redirect('/especialidades')

}

// ================================
// Mostrar formulario editar
// ================================
const formularioEditarEspecialidad = async (req, res) => {

    const { id } = req.params

    const especialidad = await Especialidad.findByPk(id)

    if (!especialidad) {

        return res.send('Especialidad no encontrada')

    }

    res.render('especialidades/editar', {

        pagina: 'Editar Especialidad',

        usuario: req.usuario,

        especialidad

    })

}

// ================================
// Actualizar especialidad
// ================================
const actualizarEspecialidad = async (req, res) => {

    const { id } = req.params

    const { nombre, descripcion } = req.body

    const especialidad = await Especialidad.findByPk(id)

    if (!especialidad) {

        return res.send('Especialidad no encontrada')

    }

    const existe = await Especialidad.findOne({

        where: {

            nombre,

            id_especialidad: {

                [Op.ne]: id

            }

        }

    })

    if (existe) {

        return res.send('Ya existe una especialidad con ese nombre')

    }

    especialidad.nombre = nombre

    especialidad.descripcion = descripcion

    await especialidad.save()

    res.redirect('/especialidades')

}

// ================================
// Eliminar especialidad
// ================================
const eliminarEspecialidad = async (req, res) => {

    const { id } = req.params

    const especialidad = await Especialidad.findByPk(id)

    if (!especialidad) {

        return res.send('La especialidad no existe')

    }

    const existeMedico = await Medico.findOne({

        where: {

            especialidad_id: id

        }

    })

    if (existeMedico) {

        return res.send('No puedes eliminar esta especialidad porque tiene médicos asociados.')

    }

    await especialidad.destroy()

    res.redirect('/especialidades')

}

export {

    listarEspecialidades,

    formularioNuevaEspecialidad,

    guardarEspecialidad,

    formularioEditarEspecialidad,

    actualizarEspecialidad,

    eliminarEspecialidad

}