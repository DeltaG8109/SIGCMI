import { Op } from 'sequelize'
import Cita from '../models/Cita.js'
import Paciente from '../models/Paciente.js'
import Medico from '../models/Medico.js'
import EstadoCita from '../models/EstadoCita.js'
import Usuario from '../models/Usuario.js'
import Especialidad from '../models/Especialidad.js'

// ======================================
// Mostrar todas las citas
// ======================================
const listarCitas = async (req, res) => {

    const citas = await Cita.findAll({

        include: [

            {
                model: Paciente,
                as: 'paciente',

                include: [
                    {
                        model: Usuario,
                        as: 'usuario'
                    }
                ]

            },

            {
                model: Medico,
                as: 'medico',

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

            },

            {
                model: EstadoCita,
                as: 'estado'
            }

        ]

    })

    res.render('citas/index', {

        pagina: 'Citas',

        usuario: req.usuario,

        citas

    })

}

// ======================================
// Mostrar formulario de nueva cita
// ======================================
const formularioNuevaCita = async (req, res) => {

    const pacientes = await Paciente.findAll({

        include: [
            {
                model: Usuario,
                as: 'usuario'
            }
        ]

    })

    const medicos = await Medico.findAll({

        include: [
            {
                model: Usuario,
                as: 'usuario'
            }
        ]

    })

    const estados = await EstadoCita.findAll()

    res.render('citas/crear', {

        pagina: 'Nueva Cita',

        usuario: req.usuario,

        pacientes,

        medicos,

        estados

    })

}

// ======================================
// Guardar cita
// ======================================
const guardarCita = async (req, res) => {

    const {

        paciente_id,

        medico_id,

        estado_id,

        fecha,

        hora,

        motivo_consulta

    } = req.body

    // ======================================
    // Validar que el médico no tenga otra cita
    // ======================================

    const citaMedico = await Cita.findOne({

        where: {

            medico_id,

            fecha,

            hora,

            estado_id: {
                [Op.ne]: 4
            },
            estado_id: {
                [Op.ne]: 4
            }

        }

    })

    if (citaMedico) {

        const pacientes = await Paciente.findAll({

            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                }
            ]

        })

        const medicos = await Medico.findAll({

            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                }
            ]

        })

        const estados = await EstadoCita.findAll()

        return res.render('citas/crear', {

            pagina: 'Nueva Cita',

            usuario: req.usuario,

            pacientes,

            medicos,

            estados,

            error: 'El médico ya tiene una cita registrada en esa fecha y hora.'

        })

    }

    // ======================================
    // Validar que el paciente no tenga otra cita
    // ======================================

    const citaPaciente = await Cita.findOne({

        where: {

            paciente_id,

            fecha,

            hora,

            estado_id: {
                [Op.ne]: 4
            },
            estado_id: {
                [Op.ne]: 4
            }

        }

    })

    if (citaPaciente) {

        const pacientes = await Paciente.findAll({

            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                }
            ]

        })

        const medicos = await Medico.findAll({

            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                }
            ]

        })

        const estados = await EstadoCita.findAll()

        return res.render('citas/crear', {

            pagina: 'Nueva Cita',

            usuario: req.usuario,

            pacientes,

            medicos,

            estados,

            error: 'El paciente ya tiene una cita registrada en esa fecha y hora.'

        })

    }

    // ======================================
    // Guardar la cita
    // ======================================

    await Cita.create({

        paciente_id,

        medico_id,

        estado_id,

        creado_por: req.usuario.id_usuario,

        fecha,

        hora,

        motivo_consulta

    })

    res.redirect('/citas')

}

// Mostrar formulario para editar una cita
const formularioEditarCita = async (req, res) => {

    const { id } = req.params

    const cita = await Cita.findByPk(id)

    const pacientes = await Paciente.findAll({

        include: [{
            model: Usuario,
            as: 'usuario'
        }]

    })

    const medicos = await Medico.findAll({

        include: [{
            model: Usuario,
            as: 'usuario'
        }]

    })

    const estados = await EstadoCita.findAll()

    res.render('citas/editar', {

        pagina: 'Editar Cita',

        usuario: req.usuario,

        cita,

        pacientes,

        medicos,

        estados

    })

}

// Actualizar cita
const editarCita = async (req, res) => {

    const { id } = req.params

    const {

        paciente_id,

        medico_id,

        estado_id,

        fecha,

        hora,

        motivo_consulta,

    } = req.body

    const cita = await Cita.findByPk(id)

    if (!cita) {

        return res.redirect('/citas')

    }

    // ======================================
    // Validar que el médico no tenga otra cita
    // ======================================

    const citaMedico = await Cita.findOne({

        where: {

            medico_id,

            fecha,

            hora,

            id_cita: {
                [Op.ne]: id
            },
            estado_id: {
                [Op.ne]: 4
            }

        }

    })

    if (citaMedico) {

        const pacientes = await Paciente.findAll({

            include: [{
                model: Usuario,
                as: 'usuario'
            }]

        })

        const medicos = await Medico.findAll({

            include: [{
                model: Usuario,
                as: 'usuario'
            }]

        })

        const estados = await EstadoCita.findAll()

        return res.render('citas/editar', {

            pagina: 'Editar Cita',

            usuario: req.usuario,

            cita,

            pacientes,

            medicos,

            estados,

            error: 'El médico ya tiene una cita registrada en esa fecha y hora.'

        })

    }

    // ======================================
    // Validar que el paciente no tenga otra cita
    // ======================================

    const citaPaciente = await Cita.findOne({

        where: {

            paciente_id,

            fecha,

            hora,

            id_cita: {
                [Op.ne]: id
            }

        }

    })

    if (citaPaciente) {

        const pacientes = await Paciente.findAll({

            include: [{
                model: Usuario,
                as: 'usuario'
            }]

        })

        const medicos = await Medico.findAll({

            include: [{
                model: Usuario,
                as: 'usuario'
            }]

        })

        const estados = await EstadoCita.findAll()

        return res.render('citas/editar', {

            pagina: 'Editar Cita',

            usuario: req.usuario,

            cita,

            pacientes,

            medicos,

            estados,

            error: 'El paciente ya tiene una cita registrada en esa fecha y hora.'

        })

    }

    // Actualizar la cita

    await cita.update({

        paciente_id,

        medico_id,

        estado_id,

        fecha,

        hora,

        motivo_consulta

    })

    res.redirect('/citas')

}



// ======================================
// Mostrar formulario para cancelar
// ======================================

const formularioCancelarCita = async (req, res) => {

    const { id } = req.params

    const cita = await Cita.findByPk(id)

    if (!cita) {

        return res.redirect('/citas')

    }

    res.render('citas/cancelar', {

        pagina: 'Cancelar Cita',

        usuario: req.usuario,

        cita

    })

}

// ======================================
// Cancelar cita
// ======================================

const cancelarCita = async (req, res) => {

    const { id } = req.params

    const { motivo_cancelacion } = req.body

    const cita = await Cita.findByPk(id)

    if (!cita) {

        return res.redirect('/citas')

    }

    // No permitir cancelar nuevamente
    if (cita.estado_id === 4) {

        return res.redirect('/citas')

    }

    await cita.update({

        estado_id: 4,

        motivo_cancelacion,

        cancelado_por: req.usuario.id_usuario,

        fecha_cancelacion: new Date()

    })

    res.redirect('/citas')

}

// ======================================
// Mostrar formulario para reprogramar
// ======================================
const formularioReprogramarCita = async (req, res) => {

    const { id } = req.params

    const cita = await Cita.findByPk(id)

    if (!cita) {

        return res.redirect('/citas')

    }

    res.render('citas/reprogramar', {

        pagina: 'Reprogramar Cita',

        usuario: req.usuario,

        cita

    })

}

// ======================================
// Reprogramar cita
// ======================================
const reprogramarCita = async (req, res) => {

    const { id } = req.params

    const {

        fecha,

        hora,

        motivo_reprogramacion

    } = req.body

    const cita = await Cita.findByPk(id)

    if (!cita) {

        return res.redirect('/citas')

    }

    // Verificar que el médico no tenga otra cita
    const citaMedico = await Cita.findOne({

        where: {

            medico_id: cita.medico_id,

            fecha,

            hora,

            estado_id: {
                [Op.ne]: 4
            },

            id_cita: {
                [Op.ne]: id
            }

        }

    })

    if (citaMedico) {

        return res.render('citas/reprogramar', {

            pagina: 'Reprogramar Cita',

            usuario: req.usuario,

            cita,

            error: 'El médico ya tiene una cita en esa fecha y hora.'

        })

    }

    // Actualizar la cita
    await cita.update({

        fecha,

        hora,

        motivo_reprogramacion,

        reprogramado_por: req.usuario.id_usuario,

        fecha_reprogramacion: new Date()

    })

    res.redirect('/citas')

}

// ======================================
// Confirmar cita
// ======================================

const confirmarCita = async (req, res) => {

    const { id } = req.params

    const cita = await Cita.findByPk(id)

    if (!cita) {
        return res.redirect('/citas')
    }

    await cita.update({

        estado_id: 2

    })

    res.redirect('/citas')

}

// ======================================
// Finalizar cita
// ======================================

const finalizarCita = async (req, res) => {

    const { id } = req.params

    const cita = await Cita.findByPk(id)

    if (!cita) {
        return res.redirect('/citas')
    }

    await cita.update({

        estado_id: 3

    })

    res.redirect('/citas')

}

export {

    listarCitas,

    formularioNuevaCita,

    guardarCita,

    formularioEditarCita,

    editarCita,

    formularioCancelarCita,

    cancelarCita,

    formularioReprogramarCita,

    reprogramarCita,

    confirmarCita,

    finalizarCita

}