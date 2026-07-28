import { DataTypes } from 'sequelize'
import db from '../config/db.js'

import Diagnostico from './Diagnostico.js'

const Prescripcion = db.define('prescripciones', {

    id_prescripcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    diagnostico_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    nombre_medicamento: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    dosis: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    frecuencia: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    duracion: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

}, {
    tableName: 'prescripciones',
    timestamps: false
})

Prescripcion.belongsTo(Diagnostico, {
    foreignKey: 'diagnostico_id',
    as: 'diagnostico'
})

Diagnostico.hasMany(Prescripcion, {
    foreignKey: 'diagnostico_id',
    as: 'prescripciones'
})

export default Prescripcion