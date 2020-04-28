export default (req: any, res: any, next: any) => {
  let { usuario } = req.sesion
  if (usuario.rol === 'ADMINISTRADOR') {
    next()
  } else {
    next({
      estado: 403,
      mensaje: 'El usuario no tiene permisos para acceder este recurso'
    })
  }
}
