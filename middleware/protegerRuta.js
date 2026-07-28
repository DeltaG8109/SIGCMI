// Importamos jsonwebtoken para verificar el token
import jwt from 'jsonwebtoken'

// Importamos el modelo Usuario para consultar la base de datos
import Usuario from '../models/Usuario.js'

// Middleware que protegerá las rutas privadas
const protegerRuta = async (req, res, next) => {

    // Obtener la cookie llamada "_token"
    const token = req.cookies._token

    // Si no existe la cookie, el usuario no ha iniciado sesión
    if (!token) {
        return res.redirect('/auth/login')
    }

    try {

        // Verificamos que el token sea válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        /*
            decoded contiene la información guardada
            dentro del JWT.

            Ejemplo:

            {
                id: 5,
                iat: 1753472000,
                exp: 1754076800
            }
        */

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findByPk(decoded.id)

        // Si el usuario no existe
        if (!usuario) {
            return res.redirect('/auth/login')
        }

        // Guardamos el usuario para utilizarlo en cualquier controlador
        req.usuario = usuario

        // Continúa hacia la siguiente función
        next()

    } catch (error) {

        console.log(error)

        return res.redirect('/auth/login')

    }

}

export default protegerRuta