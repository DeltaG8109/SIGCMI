import Usuario from '../models/Usuario.js'
import Medico from '../models/Medico.js'
import Paciente from '../models/Paciente.js'
import Cita from '../models/Cita.js'
import EstadoCita from '../models/EstadoCita.js'
import { Op } from 'sequelize'

const dashboard = async (req, res) => {

    const totalUsuarios = await Usuario.count()
    const totalMedicos = await Medico.count()
    const totalPacientes = await Paciente.count()
    const totalCitas = await Cita.count()

    const citasPendientes = await Cita.count({
        where: {
            estado_id: 1
        }
    })

    const citasCompletadas = await Cita.count({
        where: {
            estado_id: 2
        }
    })

    const citasCanceladas = await Cita.count({
        where: {
            estado_id: 4
        }
    })

    const ultimasCitas = await Cita.findAll({

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
                    }
                ]
            },

            {
                model: EstadoCita,
                as: 'estado'
            }

        ],

        order: [['id_cita', 'DESC']],

        limit: 5

    })

    const hoy = new Date()

    const fechaActual =
        hoy.toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

    const datosGraficoBarras = {
        pendientes: citasPendientes,
        completadas: citasCompletadas,
        canceladas: citasCanceladas
    }

    res.render('admin/dashboard', {

        pagina: 'Dashboard',

        usuario: req.usuario,

        totalUsuarios,

        totalMedicos,

        totalPacientes,

        totalCitas,

        citasPendientes,

        citasCompletadas,

        citasCanceladas,

        ultimasCitas,

        fechaActual,

        datosGraficoBarras,

        citasHoy,

        proximaCita

    })

}

const hoy = new Date()

const fechaHoy = hoy.toISOString().split("T")[0]

const citasHoy = await Cita.count({
    where: {
        fecha: fechaHoy
    }
})

const proximaCita = await Cita.findOne({
    where: {
        fecha:{
            [Op.gte]: fechaHoy
        }
    },

    include: [
        {
            model: Paciente,
            as: 'paciente',
            include: [{
                model: Usuario,
                as: 'usuario'
            }]
        },

        {
            model: Medico,
            as: 'medico',
            include:[{
                model: Usuario,
                as: 'usuario'
            }]
        }
    ],

    order:[
        ['fecha', 'ASC'],
        ['hora','ASC']
    ]
})

export {
    dashboard
}