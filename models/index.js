import Rol from './Rol.js'
import Usuario from './Usuario.js'
import Paciente from './Paciente.js'
import Medico from './Medico.js'
import Especialidad from './Especialidad.js'

// Un rol tiene muchos usuarios
Rol.hasMany(Usuario, {
    foreignKey: 'rol_id'
})

Usuario.belongsTo(Rol, {
    foreignKey: 'rol_id'
})

// Un usuario puede ser un paciente
Usuario.hasOne(Paciente, {
    foreignKey: 'usuario_id'
})

Paciente.belongsTo(Usuario, {
    foreignKey: 'usuario_id'
})

// Un usuario puede ser un médico
Usuario.hasOne(Medico, {
    foreignKey: 'usuario_id'
})

Medico.belongsTo(Usuario, {
    foreignKey: 'usuario_id'
})

// Una especialidad tiene muchos médicos
Especialidad.hasMany(Medico, {
    foreignKey: 'especialidad_id'
})

Medico.belongsTo(Especialidad, {
    foreignKey: 'especialidad_id'
})

export {
    Rol,
    Usuario,
    Paciente,
    Medico,
    Especialidad
}