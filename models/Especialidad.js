// Importamos los tipos de datos de Sequelize
import { DataTypes } from 'sequelize'

// Importamos la conexión con la base de datos
import db from '../config/db.js'

// Creamos el modelo de la tabla especialidades
const Especialidad = db.define(
    'especialidades',
    {

        // Llave primaria
        id_especialidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // Nombre de la especialidad
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        // Descripción de la especialidad
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    },
    {
        // La tabla ya existe en MySQL
        timestamps: false
    }
)

// Exportamos el modelo
export default Especialidad