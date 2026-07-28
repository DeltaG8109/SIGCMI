import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Usuario from './Usuario.js'


const Paciente = db.define('pacientes', {

    id_paciente:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    usuario_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    fecha_nacimiento:{
        type:DataTypes.DATEONLY
    },

    tipo_sangre:{
        type:DataTypes.STRING(5)
    },

    alergias:{
        type:DataTypes.TEXT
    },

    condiciones_medicas:{
        type:DataTypes.TEXT
    },

    direccion:{
        type:DataTypes.STRING(150)
    },

    departamento:{
        type:DataTypes.STRING(50)
    },

    ciudad:{
        type:DataTypes.STRING(50)
    }

},{
    timestamps:false
})


// Paciente pertenece a Usuario
Paciente.belongsTo(Usuario,{
    foreignKey:'usuario_id',
    as:'usuario'
})


// Usuario tiene un Paciente
Usuario.hasOne(Paciente,{
    foreignKey:'usuario_id',
    as:'paciente'
})


export default Paciente