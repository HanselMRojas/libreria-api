import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

// Librerias y configuraciones
import MongoDb from './librerias/mongo'
import ServerConfig from './servidor'

// Modulos
import auth from './autenticacion'
import biblioteca from './biblioteca'

const helmet = require('helmet')
const app: Application = express()

app.use(bodyParser.urlencoded({ extended: false, limit: ServerConfig.bodyRequestLimit }))
app.use(bodyParser.json({ limit: ServerConfig.bodyRequestLimit }))
app.use(helmet())
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.all(['/', '/v1', '/ping'], (req: Request, res: Response) => {
  res.status(200).json({
    name: 'Libreria API',
    provider: 'hanselmrojas.com',
    version: 'v1'
  })
})

// Enrutadores
app.use('/v1/autenticacion', auth)
app.use('/v1/biblioteca', biblioteca)

if (process.env.NODE_ENV !== 'test') {
  MongoDb.connect()
}

export default app
