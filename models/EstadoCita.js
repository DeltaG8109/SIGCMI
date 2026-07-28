// Importamos los tipos de datos de Sequelize
import { DataTypes } from 'sequelize'

// Importamos la conexión con la base de datos
import db from '../config/db.js'

// Creamos el modelo de la tabla estados_cita
const EstadoCita = db.define(
    'estados_cita',
    {

        // Llave primaria
        id_estado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // Nombre del estado
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }

    },
    {
        timestamps: false
    }
)

// Exportamos el modelo
export default EstadoCita