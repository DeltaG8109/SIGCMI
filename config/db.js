import { Sequelize } from 'sequelize';

const db = new Sequelize(
    'sigcmi',      // Base de datos
    'root',        // Usuario
    '',            // Contraseña
    {
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
);

export default db;