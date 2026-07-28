// Importamos los modelos
import Usuario from '../models/Usuario.js'
import Medico from '../models/Medico.js'
import Paciente from '../models/Paciente.js'
import Cita from '../models/Cita.js'

const dashboard = async (req, res) => {

    const totalUsuarios = await Usuario.count()
    const totalMedicos = await Medico.count()
    const totalPacientes = await Paciente.count()
    const totalCitas = await Cita.count()

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