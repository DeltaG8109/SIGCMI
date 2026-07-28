import { DataTypes } from 'sequelize'
import db from '../config/db.js'

import Paciente from './Paciente.js'
import Medico from './Medico.js'
import EstadoCita from './EstadoCita.js'
import Usuario from './Usuario.js'

const Cita = db.define('citas', {

    id_cita: {

        type: DataTypes.INTEGER,

        primaryKey: true,

        autoIncrement: true

    },

    paciente_id: {

        type: DataTypes.INTEGER,

        allowNull: false

    },

    medico_id: {

        type: DataTypes.INTEGER,

        allowNull: false

    },

    estado_id: {

        type: DataTypes.INTEGER,

        allowNull: false

    },

    creado_por: {

        type: DataTypes.INTEGER,

        allowNull: false

    },

    fecha: {

        type: DataTypes.DATEONLY,

        allowNull: false

    },

    hora: {

        type: DataTypes.TIME,

        allowNull: false

    },

    motivo_consulta: {

        type: DataTypes.TEXT

    },

    fecha_creacion: {

        type: DataTypes.DATE

    },

    fecha_actualizacion: {

        type: DataTypes.DATE

    },

    motivo_cancelacion: {

        type: DataTypes.TEXT

    },

    cancelado_por: {

        type: DataTypes.INTEGER

    },

    fecha_cancelacion: {

        type: DataTypes.DATE

    },

    reprogramado_por: {

        type: DataTypes.INTEGER

    },

    fecha_reprogramacion: {

        type: DataTypes.DATE

    },

    motivo_reprogramacion: {

        type: DataTypes.TEXT

    }

}, {

    timestamps: false

})

/*
=========================================
RELACIÓN CITA -> PACIENTE
=========================================
*/

Cita.belongsTo(Paciente, {

    foreignKey: 'paciente_id',

    as: 'paciente'

})

Paciente.hasMany(Cita, {

    foreignKey: 'paciente_id',

    as: 'citas'

})

/*
=========================================
RELACIÓN CITA -> MÉDICO
=========================================
*/

Cita.belongsTo(Medico, {

    foreignKey: 'medico_id',

    as: 'medico'

})

Medico.hasMany(Cita, {

    foreignKey: 'medico_id',

    as: 'citas'

})

/*
=========================================
RELACIÓN CITA -> ESTADO
=========================================
*/

Cita.belongsTo(EstadoCita, {

    foreignKey: 'estado_id',

    as: 'estado'

})

EstadoCita.hasMany(Cita, {

    foreignKey: 'estado_id',

    as: 'citas'

})

/*
=========================================
RELACIÓN CITA -> USUARIO CREADOR
=========================================
*/

Cita.belongsTo(Usuario, {

    foreignKey: 'creado_por',

    as: 'creador'

})

Usuario.hasMany(Cita, {

    foreignKey: 'creado_por',

    as: 'citasCreadas'

})

export default Cita