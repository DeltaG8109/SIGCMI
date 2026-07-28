import { DataTypes } from 'sequelize'
import db from '../config/db.js'


const Rol = db.define('roles', {

    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

}, {
    timestamps: false
})


export default Rol