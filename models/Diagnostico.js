import { DataTypes } from 'sequelize'
import db from '../config/db.js'

import Cita from './Cita.js'

const Diagnostico = db.define('diagnosticos', {

    id_diagnostico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    cita_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    temperatura: DataTypes.DECIMAL(4,1),

    presion_arterial: DataTypes.STRING(20),

    altura: DataTypes.DECIMAL(4,2),

    peso: DataTypes.DECIMAL(5,2),

    frecuencia_cardiaca: DataTypes.INTEGER,

    sintomas: DataTypes.TEXT,

    diagnostico: DataTypes.TEXT,

    tratamiento: DataTypes.TEXT,

    notas_adicionales: DataTypes.TEXT,

    fecha_diagnostico: DataTypes.DATE

},{
    timestamps:false
})

Diagnostico.belongsTo(Cita,{
    foreignKey:'cita_id',
    as:'cita'
})

Cita.hasOne(Diagnostico,{
    foreignKey:'cita_id',
    as:'diagnostico'
})

export default Diagnostico