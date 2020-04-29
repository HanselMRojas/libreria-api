export interface IServerConfig {
  port: number | string
  bodyRequestLimit: string
  jwtSecret: string
  uploadDir: string
}

export interface IKeys {
  sendgrid: string
}

export interface IMongoDBConfig {
  auth: boolean
  host: string
  db: string
  port: number | string
  username?: string | null
  password?: string | null
}

export interface IGoogleGCP {
  projectId: string
  keyFilename: string
}

/**
 * NOTA:
 * Esta no es la mejor implementación de una clase de configuración.
 * Ya que la idea es implementar un Factory para las configuraciones
 * de bases de datos. Pero lo vamos a dejar provisional.
 */
export class ServerConfig implements IServerConfig {
  port: number | string
  bodyRequestLimit: string
  jwtSecret: string
  uploadDir: string
  mongodbDev: IMongoDBConfig
  mongodbProd: IMongoDBConfig
  gcp: IGoogleGCP
  keys: IKeys
  // sendgrid: ISendgrid

  constructor () {
    this.port = process.env.APP_PORT || 3000
    this.bodyRequestLimit = process.env.APP_BODY_REQUEST_LIMIT || '500mb'
    this.jwtSecret = process.env.APP_JWT_SECRET || 'SECRET'
    this.uploadDir = process.env.UPLOAD_DIR || '/tmp/servicios/app'

    // Configurar MongoDB
    this.mongodbDev = {
      auth: Boolean(process.env.MONGO_DB_AUTH_FLAG) || false,
      host: process.env.MONGO_DB_HOST || 'localhost',
      port: process.env.MONGO_DB_PORT || 27017,
      db: process.env.MONGO_DB_NAME || 'agente_dev',
      username: process.env.MONGO_DB_USER || null,
      password: process.env.MONGO_DB_PASS || null
    }

    this.mongodbProd = {
      auth: Boolean(process.env.MONGO_DB_AUTH_FLAG) || false,
      host: process.env.MONGO_DB_HOST || 'mongo',
      port: process.env.MONGO_DB_PORT || 27017,
      db: process.env.MONGO_DB_NAME || 'libreria',
      username: process.env.MONGO_DB_USER || null,
      password: process.env.MONGO_DB_PASS || null
    }

    this.gcp = {
      projectId: process.env.GCP_PROJECT_ID || 'libreria',
      keyFilename: process.env.GCP_DIR_KEY || 'keys/gcp.json'
    }

    this.keys = {
      sendgrid: process.env.SENDGRID_API_KEY || ''
    }
  }
}

export default new ServerConfig()
