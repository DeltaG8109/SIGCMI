import Especialidad from '../models/Especialidad.js'

// Mostrar todas las especialidades
const listarEspecialidades = async (req, res) => {

    const especialidades = await Especialidad.findAll({
        order: [['nombre', 'ASC']]
    })

    res.render('especialidades/index', {
        pagina: 'Especialidades',
        usuario: req.usuario,
        especialidades
    })

}

// Mostrar formulario
const formularioNuevaEspecialidad = (req, res) => {

    res.render('especialidades/crear', {

        pagina: 'Nueva Especialidad',
        usuario: req.usuario

    })

}

// Guardar especialidad
const guardarEspecialidad = async (req, res) => {

    const { nombre, descripcion } = req.body

    // Verificar si ya existe
    const existe = await Especialidad.findOne({
        where: { nombre }
    })

    if (existe) {
        return res.send('La especialidad ya existe')
    }

    await Especialidad.create({

        nombre,
        descripcion

    })

    res.redirect('/especialidades')

}

// Mostrar formulario para editar
const formularioEditarEspecialidad = async (req, res) => {

    const { id } = req.params

    const especialidad = await Especialidad.findByPk(id)

    if (!especialidad) {
        return res.send('Especialidad no encontrada')
    }

    res.render('especialidades/editar', {

        pagina: 'Editar Especialidad',

        usuario: req.usuario,

        especialidad

    })

}

// Actualizar especialidad
const actualizarEspecialidad = async (req, res) => {

    // Obtenemos el ID que viene en la URL
    const { id } = req.params

    // Obtenemos los datos enviados por el formulario
    const { nombre, descripcion } = req.body

    // Buscamos la especialidad
    const especialidad = await Especialidad.findByPk(id)

    // Si no existe, mostramos un mensaje
    if (!especialidad) {
        return res.send('Especialidad no encontrada')
    }

    // Actualizamos los datos
    especialidad.nombre = nombre
    especialidad.descripcion = descripcion

    // Guardamos los cambios
    await especialidad.save()

    // Regresamos al listado
    res.redirect('/especialidades')

}


// Eliminar especialidad
const eliminarEspecialidad = async (req, res) => {

    try {

        const { id } = req.params

        const especialidad = await Especialidad.findByPk(id)

        if (!especialidad) {
            return res.send('La especialidad no existe')
        }

        await especialidad.destroy()

        res.redirect('/especialidades')

    } catch (error) {

        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.send('No se puede eliminar esta especialidad porque tiene médicos asociados.')
        }

        console.log(error)

        res.send('Error al eliminar la especialidad')

    }

}
export {

    listarEspecialidades,

    formularioNuevaEspecialidad,

    guardarEspecialidad,

    formularioEditarEspecialidad,

    actualizarEspecialidad,

    eliminarEspecialidad
}