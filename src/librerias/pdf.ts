import ServerConfig from '../servidor'

/**
 * TODO:
 * Hay que mejorar la implementación de tipos para JSReport Client
 */
const Client = require('jsreport-client')(
  ServerConfig.jsreport.host,
  ServerConfig.jsreport.user,
  ServerConfig.jsreport.pass
)

export default Client
