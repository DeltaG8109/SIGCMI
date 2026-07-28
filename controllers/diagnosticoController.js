import Diagnostico from '../models/Diagnostico.js'
import Cita from '../models/Cita.js'
import Paciente from '../models/Paciente.js'
import Medico from '../models/Medico.js'
import Usuario from '../models/Usuario.js'

const listarDiagnosticos = async(req,res)=>{

    const diagnosticos = await Diagnostico.findAll({

        include:[

            {

                model:Cita,
                as:'cita',

                include:[

                    {

                        model:Paciente,
                        as:'paciente',

                        include:[

                            {

                                model:Usuario,
                                as:'usuario'

                            }

                        ]

                    },

                    {

                        model:Medico,
                        as:'medico',

                        include:[

                            {

                                model:Usuario,
                                as:'usuario'

                            }

                        ]

                    }

                ]

            }

        ]

    })

    res.render('diagnosticos/index',{

        pagina:'Diagnósticos',

        usuario:req.usuario,

        diagnosticos

    })

}

const formularioNuevoDiagnostico = async(req,res)=>{

    const citas = await Cita.findAll({

        include:[

            {

                model:Paciente,
                as:'paciente',

                include:[{

                    model:Usuario,
                    as:'usuario'

                }]

            },

            {

                model:Medico,
                as:'medico',

                include:[{

                    model:Usuario,
                    as:'usuario'

                }]

            }

        ]

    })

    res.render('diagnosticos/crear',{

        pagina:'Nuevo Diagnóstico',

        usuario:req.usuario,

        citas

    })

}

const guardarDiagnostico = async(req,res)=>{

    await Diagnostico.create(req.body)

    res.redirect('/diagnosticos')

}


// ======================================
// Ver diagnóstico
// ======================================

const verDiagnostico = async (req, res) => {

    const { id } = req.params

    const diagnostico = await Diagnostico.findByPk(id, {

        include: [

            {

                model: Cita,
                as: 'cita',

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

                    }

                ]

            }

        ]

    })

    if (!diagnostico) {

        return res.redirect('/diagnosticos')

    }

    res.render('diagnosticos/ver', {

        pagina: 'Diagnóstico',

        usuario: req.usuario,

        diagnostico

    })

}

export{

    listarDiagnosticos,

    formularioNuevoDiagnostico,

    guardarDiagnostico,

    verDiagnostico

}