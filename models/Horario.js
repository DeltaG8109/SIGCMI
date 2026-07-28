import { DataTypes } from 'sequelize'
import db from '../config/db.js'

import Medico from './Medico.js'
import Usuario from './Usuario.js'

const Horario = db.define('horarios', {

    id_horario: {

        type: DataTypes.INTEGER,

        primaryKey: true,

        autoIncrement: true

    },

    medico_id: {

        type: DataTypes.INTEGER,

        allowNull: false

    },

    hora_inicio: {

        type: DataTypes.TIME,

        allowNull: false

    },

    hora_fin: {

        type: DataTypes.TIME,

        allowNull: false

    },

    fecha_creacion: {

        type: DataTypes.DATE

    },

    estado: {

        type: DataTypes.ENUM(

            'Pendiente',

            'Aprobado',

            'Rechazado'

        ),

        defaultValue: 'Pendiente'

    },

    dia_semana: {

        type: DataTypes.ENUM(

            'Lunes',

            'Martes',

            'Miercoles',

            'Jueves',

            'Viernes',

            'Sabado',

            'Domingo'

        ),

        allowNull: false

    },

    aprobado_por: {

        type: DataTypes.INTEGER

    }

}, {

    timestamps: false

})

/*
=========================================
RELACIÓN HORARIO -> MÉDICO
=========================================
Un horario pertenece a un médico.
*/

Horario.belongsTo(Medico, {

    foreignKey: 'medico_id',

    as: 'medico'

})

Medico.hasMany(Horario, {

    foreignKey: 'medico_id',

    as: 'horarios'

})

/*
=========================================
RELACIÓN HORARIO -> USUARIO
=========================================
El administrador que aprueba un horario.
*/

Horario.belongsTo(Usuario, {

    foreignKey: 'aprobado_por',

    as: 'aprobador'

})

Usuario.hasMany(Horario, {

    foreignKey: 'aprobado_por',

    as: 'horariosAprobados'

})

export default Horario