import supertest from 'supertest'
import app from '../src/app'

/**
 * Los métodos básicos del API, comprobar que funcione correctamente.
 */
describe('Probando API Básico', () => {
  it('El API está encendido y da respuesta', async (done) => {
    let response = await supertest(app).get('/ping')

    expect(response.status).toBe(200)
    expect(response.body.version).toBe('v1')
    done()
  })
})
