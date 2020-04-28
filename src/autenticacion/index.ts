import express from 'express'

import {
  inicioSesion,
  crearUsuario,
  cerrarSesion
} from './ControllerJwtAuth'

import JWTMiddleware from '../middlewares/JwtMiddleware'

const AuthRouter = express.Router()

AuthRouter.post('/login', inicioSesion)
AuthRouter.post('/registro', crearUsuario)

AuthRouter.delete('/cerrar_sesion', [
  JWTMiddleware
], cerrarSesion)

export default AuthRouter
