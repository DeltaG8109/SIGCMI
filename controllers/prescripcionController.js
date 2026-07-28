import Prescripcion from '../models/Prescripcion.js'
import Diagnostico from '../models/Diagnostico.js'
import Cita from '../models/Cita.js'
import Paciente from '../models/Paciente.js'
import Medico from '../models/Medico.js'
import Usuario from '../models/Usuario.js'

/* ======================================
   LISTAR PRESCRIPCIONES
====================================== */

const listarPrescripciones = async (req, res) => {

    const prescripciones = await Prescripcion.findAll({

        include: [

            {

                model: Diagnostico,
                as: 'diagnostico',

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

            }

        ]

    })

    res.render('prescripciones/index',{

        pagina:'Prescripciones',

        usuario:req.usuario,

        prescripciones

    })

}


/* ======================================
   FORMULARIO
====================================== */

const formularioNuevaPrescripcion = async(req,res)=>{

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

                    }

                ]

            }

        ]

    })

    res.render('prescripciones/crear',{

        pagina:'Nueva Prescripción',

        usuario:req.usuario,

        diagnosticos

    })

}


/* ======================================
   GUARDAR
====================================== */

const guardarPrescripcion = async(req,res)=>{

    await Prescripcion.create(req.body)

    res.redirect('/prescripciones')

}

/* ======================================
   FORMULARIO EDITAR
====================================== */

const formularioEditarPrescripcion = async (req, res) => {

    const { id } = req.params

    const prescripcion = await Prescripcion.findByPk(id)

    if (!prescripcion) {
        return res.redirect('/prescripciones')
    }

    const diagnosticos = await Diagnostico.findAll({

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
                    }
                ]
            }
        ]

    })

    res.render('prescripciones/editar', {

        pagina: 'Editar Prescripción',

        usuario: req.usuario,

        prescripcion,

        diagnosticos

    })

}

/* ======================================
   ACTUALIZAR
====================================== */

const actualizarPrescripcion = async (req, res) => {

    const { id } = req.params

    const prescripcion = await Prescripcion.findByPk(id)

    if (!prescripcion) {
        return res.redirect('/prescripciones')
    }

    await prescripcion.update(req.body)

    res.redirect('/prescripciones')

}

/* ======================================
   ELIMINAR
====================================== */

const eliminarPrescripcion = async (req, res) => {

    const { id } = req.params

    const prescripcion = await Prescripcion.findByPk(id)

    if (!prescripcion) {
        return res.redirect('/prescripciones')
    }

    await prescripcion.destroy()

    res.redirect('/prescripciones')

}

export{

    listarPrescripciones,

    formularioNuevaPrescripcion,

    guardarPrescripcion,

    formularioEditarPrescripcion,

    actualizarPrescripcion ,

    eliminarPrescripcion

}