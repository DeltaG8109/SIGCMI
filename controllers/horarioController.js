import Horario from '../models/Horario.js'
import Medico from '../models/Medico.js'
import Usuario from '../models/Usuario.js'
import { Op } from 'sequelize'

// ======================================
// Obtener todos los médicos con su usuario
// ======================================
const obtenerMedicos = async () => {

    return await Medico.findAll({

        include: [
            {
                model: Usuario,
                as: 'usuario'
            }
        ]

    })

}

// ======================================
// Mostrar todos los horarios
// ======================================
const listarHorarios = async (req, res) => {

    const horarios = await Horario.findAll({

        include: [

            {
                model: Medico,
                as: 'medico',

                include: [

                    {
                        model: Usuario,
                        as: 'usuario'
                    }

                ]

            }

        ]

    })

    res.render('horarios/index', {

        pagina: 'Horarios',

        usuario: req.usuario,

        horarios

    })

}

// ======================================
// Mostrar formulario de nuevo horario
// ======================================
const formularioNuevoHorario = async (req, res) => {

    const medicos = await obtenerMedicos()

    res.render('horarios/crear', {

        pagina: 'Nuevo Horario',

        usuario: req.usuario,

        medicos

    })

}

// ======================================
// Guardar horario
// ======================================
const guardarHorario = async (req, res) => {

    const {

        medico_id,

        dia_semana,

        hora_inicio,

        hora_fin

    } = req.body

    // Validar que la hora de inicio sea menor
    if (hora_inicio >= hora_fin) {

        const medicos = await obtenerMedicos()

        return res.render('horarios/crear', {

            pagina: 'Nuevo Horario',

            usuario: req.usuario,

            medicos,

            error: 'La hora de inicio debe ser menor que la hora de fin.'

        })

    }

    // Verificar si el médico ya tiene un horario en ese rango
    const horarioExistente = await Horario.findOne({

        where: {

            medico_id,

            dia_semana,

            hora_inicio: {
                [Op.lt]: hora_fin
            },

            hora_fin: {
                [Op.gt]: hora_inicio
            }

        }

    })

    if (horarioExistente) {

        const medicos = await obtenerMedicos()

        return res.render('horarios/crear', {

            pagina: 'Nuevo Horario',

            usuario: req.usuario,

            medicos,

            error: 'Ese médico ya tiene un horario registrado en ese rango.'

        })

    }

    await Horario.create({

        medico_id,

        dia_semana,

        hora_inicio,

        hora_fin,

        estado: 'Pendiente'

    })

    res.redirect('/horarios')

}

export {

    listarHorarios,

    formularioNuevoHorario,

    guardarHorario

}