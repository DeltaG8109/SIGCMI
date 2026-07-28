// Importamos los modelos
import Usuario from '../models/Usuario.js'
import Medico from '../models/Medico.js'
import Paciente from '../models/Paciente.js'
import Cita from '../models/Cita.js'

// Dashboard principal
const dashboard = async (req, res) => {

    // Contamos los registros de cada tabla
    const totalUsuarios = await Usuario.count()

    const totalMedicos = await Medico.count()

    const totalPacientes = await Paciente.count()

    const totalCitas = await Cita.count()

    // Enviamos la información a la vista
    res.render('admin/dashboard', {

        pagina: 'Dashboard',

        usuario: req.usuario,

        totalUsuarios,

        totalMedicos,

        totalPacientes,

        totalCitas

    })

}

export {
    dashboard
}