import Cita from '../models/Cita.js'
import Paciente from '../models/Paciente.js'
import Usuario from '../models/Usuario.js'

export const verCalendario = async (req, res) => {

    res.render('calendario/index', {

        pagina: 'Calendario',

        usuario: req.usuario

    })

}

export const obtenerEventos = async (req, res) => {

    const citas = await Cita.findAll({

        include: [
            {
                model: Paciente,
                as: 'paciente',
                include: [{
                    model: Usuario,
                    as: 'usuario'
                }]
            }
        ]

    })

    const eventos = citas.map(cita => ({

        id: cita.id_cita,

        title:
            `${cita.hora.substring(0, 5)} - ${cita.paciente.usuario.nombres} ${cita.paciente.usuario.apellidos}`,

        start: `${cita.fecha}T${cita.hora}`,

        extendedProps: {

            paciente:
                `${cita.paciente.usuario.nombres} ${cita.paciente.usuario.apellidos}`,

            estado: cita.estado_id

        }

    }))

    res.json(eventos)

}