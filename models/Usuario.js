import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcrypt'
import Rol from './Rol.js'

const Usuario = db.define('usuarios', {

    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    telefono: {
        type: DataTypes.STRING(20)
    },

    tipo_documento: {
        type: DataTypes.STRING(30)
    },

    numero_documento: {
        type: DataTypes.STRING(30)
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    token: {
        type: DataTypes.STRING(150)
    }

});

Usuario.prototype.verificarPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

Usuario.belongsTo(Rol, {

    foreignKey: 'rol_id',

    as: 'rol'

})

export default Usuario;