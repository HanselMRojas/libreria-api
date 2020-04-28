import { Request, Response, NextFunction }  from 'express'

import chalk from 'chalk'
import logger from '../librerias/logger'
import server from '../servidor'
import app from '../app'

const figlet = require('figlet')

/**
 * Manejador de errores.
 * Todos las rutas llaman a la funcion Next en cada ruta.
 * Pasando un un documento como
 * {
 * 		"estado": <404:number>,
 * 		"mensaje": <mensaje:string>
 * }
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.estado === 500) {
    logger.error(err.original)
    res.status(500).json({
      estado: 500,
      mensaje: 'Tenemos problemas con el servidor. Se ha creado una notificacion al área de soporte sobre este error. Gracias por tu paciencia'
    })
  } else {
    res.status(err.estado).json({
      mensaje: err.mensaje,
      estado: err.estado
    })
  }
})

// Error 404 Por defecto
app.use((req: Request, res: Response) => {
  res.status(404).json({
    mensaje: 'El recurso solicitado no ha sido encontrado',
    codigo: 'general'
  })
})

app.listen(server.port, () => {
  figlet('Libreria API', (err: any, figletText: any) => {
    if (err) {
      throw err
    }
    process.stdout.write(chalk.yellow(figletText + '\n'))
    logger.info(`App is running on: ${server.port}`)
  })
})
