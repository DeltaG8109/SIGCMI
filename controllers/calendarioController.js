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

        id: cita.id,

        title: cita.paciente.usuario.nombres,

        start: `${cita.fecha}T${cita.hora}`

    }))

    res.json(eventos)

}