import Sesion from '../autenticacion/SchemaSesion'
import ServerConfig from '../servidor'

const jwt = require('jsonwebtoken')

export default async (req: any, res: any, next: any) => {
  try {
    let header = req.headers['authorization']

    /* Varificar si el header de autorizacion viene en las cabeceras */
    if (!header) {
      next({
        estado: 400,
        mensaje: 'Este recurso es privado, no se ha enviado un header ni un token de autorización'
      })
    }
    let sign = header.split(' ')[1]  // Se extrae el token: Authorization: Barear <token> ['Barear', '<token>']
    let token = jwt.verify(sign, ServerConfig.jwtSecret)

    let sesion = await Promise.resolve(Sesion.findOne({ id: token.id, activo: true })
      .populate('usuario')
      .lean())

    // Validar sesion
    if (sesion) {
      req.sesion = sesion
      next()
    } else {
      next({
        estado: 404,
        mensaje: 'La sesión no fue encontrada'
      })
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next({
        estado: 400,
        mensaje: 'Esta sesion no tiene un token válido'
      })
    } else if (error.name === 'TokenExpiredError') {
      next({
        estado: 401,
        mensaje: 'El token de sesión ha expirado'
      })
    } else {
      next({
        estado: 500,
        mensaje: 'codigo: 1001 - Tenemos problemas con el servidor, estamos trabajando para arreglarlo. Gracias por su paciencia',
        original: error
      })
    }
  }
}
