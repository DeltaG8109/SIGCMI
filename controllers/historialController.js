import Paciente from '../models/Paciente.js'
import Usuario from '../models/Usuario.js'
import Cita from '../models/Cita.js'
import Medico from '../models/Medico.js'
import EstadoCita from '../models/EstadoCita.js'
import Diagnostico from '../models/Diagnostico.js'
import Prescripcion from '../models/Prescripcion.js'

const verHistorial = async (req, res) => {

    const { id } = req.params

    const paciente = await Paciente.findByPk(id, {

        include: [

            {
                model: Usuario,
                as: 'usuario'
            },

            {

                model: Cita,
                as: 'citas',

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

                    },

                    {

                        model: EstadoCita,
                        as: 'estado'

                    },

                    {

                        model: Diagnostico,
                        as: 'diagnostico',

                        include: [

                            {

                                model: Prescripcion,
                                as: 'prescripciones'

                            }

                        ]

                    }

                ]

            }

        ]

    })

    if (!paciente) {

        return res.redirect('/pacientes')

    }

    res.render('historial/ver', {

        pagina: 'Historial Clínico',

        usuario: req.usuario,

        paciente

    })

}

export {

    verHistorial

}