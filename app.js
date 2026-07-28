import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import usuariosRoutes from './routes/usuariosRoutes.js'
import cookieParser from 'cookie-parser'
import dashboardRoutes from './routes/dashboardRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import especialidadRoutes from './routes/especialidadRoutes.js'
import medicoRoutes from './routes/medicoRoutes.js'
import horarioRoutes from './routes/horarioRoutes.js'
import citaRoutes from './routes/citaRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import diagnosticoRoutes from './routes/diagnosticoRoutes.js'
import prescripcionRoutes  from './routes/prescripcionRoutes.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.urlencoded({ extended: true }))

//Para JWT
app.use(cookieParser())

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Leer datos de formularios
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/auth', usuariosRoutes)

//Ruta del dashboard
app.use('/dashboard', dashboardRoutes)

//Ruta de especialidades
app.use('/especialidades', especialidadRoutes)

//Ruta del medico
app.use('/medicos', medicoRoutes)

//Ruta de Horario Medicos
app.use('/horarios', horarioRoutes)

//Ruta del Admin
app.use('/', adminRoutes)

//Ruta de citas
app.use('/citas', citaRoutes)

//Ruta de los pacientes
app.use('/pacientes', pacienteRoutes)

app.use('/usuarios', usuarioRoutes)

//Ruta de diagnosticos
app.use('/diagnosticos', diagnosticoRoutes)

//Ruta de prescripciones
app.use('/prescripciones', prescripcionRoutes)

app.use(express.static(path.join(__dirname, 'public')))

export default app