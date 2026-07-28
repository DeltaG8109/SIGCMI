import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Usuario from './Usuario.js'
import Especialidad from './Especialidad.js'

const Medico = db.define('medicos', {

    id_medico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    especialidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cedula_profesional: {
        type: DataTypes.STRING(50)
    },

    anios_experiencia: {
        type: DataTypes.INTEGER
    }

});


Medico.belongsTo(Usuario, {

    foreignKey: 'usuario_id',

    as: 'usuario'

})

Usuario.hasOne(Medico, {

    foreignKey: 'usuario_id',

    as: 'medico'

})

// ================================
// RELACIÓN MÉDICO - ESPECIALIDAD
// ================================

// Un médico pertenece a una especialidad.
Medico.belongsTo(Especialidad, {

    foreignKey: 'especialidad_id',

    as: 'especialidad'

})

// Una especialidad puede tener muchos médicos.
Especialidad.hasMany(Medico, {

    foreignKey: 'especialidad_id',

    as: 'medicos'

})

export default Medico;